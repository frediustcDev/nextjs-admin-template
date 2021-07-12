import * as React from "react";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import { Card, CardBody } from "@paljs/ui/Card";
import Select from "@paljs/ui/Select";
import { InputGroup as Input } from "@paljs/ui/Input";
import { Button } from "@paljs/ui/Button";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import Progress from "@paljs/ui/ProgressBar";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import Layout from "../../Layouts";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { SubmitHandler, useForm } from "react-hook-form";
import { OptionTypeBase } from "react-select";
import * as UpChunk from "@mux/upchunk";
import { BASE_URL, CATEGORIES } from "../../utils";
import axios from "axios";
import {
  AUTH_CLIENT,
  FIRESTORE_CLIENT,
  STORAGE_CLIENT,
} from "../../server/FirebaseClient";
import firebase from "firebase";
import Spinner from "@paljs/ui/Spinner";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

type Inputs = {
  title: string;
  description: string;
  trailer: string;
};

const AddVideo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [category, setCategory] = React.useState<OptionTypeBase>(
    Object.keys(CATEGORIES).map((key) => ({
      value: key,
      label: CATEGORIES[key],
    }))[0]
  );
  const [progress, setProgress] = React.useState<number>(0);
  const [progressText, setProgressText] = React.useState<string>(
    "Publication de la video"
  );

  const [video, setVideo] = React.useState<File>(null);
  const [cover, setCover] = React.useState<File>(null);

  const createVideoHandler: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    setProgress(0);
    setProgressText("Publication de la video en cours...");
    let localUploadID = "";

    try {
      if (!category) {
        throw "Vous devez selectionner la categorie de la video";
      }

      if (!video) {
        throw "Vous devez ajouter la video";
      }

      if (!cover) {
        throw "Vous devez ajouter la couverture";
      }

      // CREATING THE FONCTION TO GENERATE THE UPLOAD URL
      const getUploadUrl = () =>
        fetch(BASE_URL + "/api/uploadFile").then(async (res) => {
          try {
            const { data } = await res.json();

            console.log(data);

            if (data.id) {
              localUploadID = data.id;
            }

            return data.url;
          } catch (error) {
            return "error-found";
          }
        });

      //INVOKING THE UPLOAD FUNCTIONS USING MUX_UPCHUNK
      const upload = UpChunk.createUpload({
        file: video,
        endpoint: getUploadUrl,
      });

      //SET THE PROGRESS BAR
      upload.on("progress", (e) => {
        setProgress(Math.round(e.detail));
      });

      //GETTING THE ERROR AND SHOW IT TO THE CONSOLE
      upload.on("error", (e) => {
        console.error("ERROR => ", e.detail);
        setLoading(false);
      });

      //GO AHEAD ON SUCCESS AND ADD THE VIDEO TO FIRESTORE
      upload.on("success", async (e) => {
        //GETTING THE VIDEO DATA
        const { data: axiosData } = await axios.post(
          BASE_URL + "/api/getVideo",
          { id: localUploadID }
        );

        const videoData = axiosData.data;

        //IN CASE OF ERROR JUST SHOW THE ERROR
        if (!axiosData.success) {
          alert("error");
          console.log(axiosData.data);
          setLoading(false);
        } else {
          //SWITCH THE PROGRESS TEXT TO SHOW THE COVER UPLOAD
          setProgressText("Publication de la couverture en cours...");
          setProgress(0);

          //PUTTING THE COVER TO THE FIREBASE STORAGE BUCKET
          const coverRef = STORAGE_CLIENT.ref().child(`covers/${videoData.id}`);

          try {
            //putting the files in the cloud
            const _coverRef = coverRef.put(cover);

            //getting the files URL
            const coverURL = await (await _coverRef).ref.getDownloadURL();

            _coverRef.on(
              "state_changed",
              (snapshot) => {
                const _progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setProgress(Math.round(_progress));
              },
              (error) => {
                console.error(error);
                //feed-back
                alert("video/upload-failed");
                setLoading(false);
              },

              //SAVING DATA ON SUCCESS
              async () => {
                try {
                  setProgressText("Sauvegarde des donnees...");

                  //getting the current user
                  const user = AUTH_CLIENT.currentUser;

                  const firestoreData = {
                    uid: user.uid,
                    coverURL,
                    videoURL: videoData.id,
                    duration: Math.round(videoData.duration || 60 * 60 * 1.5),
                    aspectRatio: videoData.aspect_ratio || "16:9",
                    muxUploadID: videoData.upload_id,
                    tags: [],
                    promote: false,
                    ...data,
                  };

                  await FIRESTORE_CLIENT.collection("videos")
                    .doc(videoData.id)
                    .set({
                      createdAt: firebase.firestore.Timestamp.now(),
                      ...firestoreData,
                    });

                  alert("Votre video a ete publie!");
                  setLoading(false);
                  // form.resetFields();
                  // setVideo(null), setCover(null);
                } catch (error) {
                  console.error(error);
                  //feed-back
                  alert("video/upload-failed");
                  setLoading(false);
                }
              }
            );
          } catch (error) {
            console.error(error);

            //deleting existing file if exists
            // await coverRef.delete();

            //feed-back
            alert("video/upload-failed");
            setLoading(false);
          }
        }
      });
    } catch (error) {
      console.error(error);
      alert(error);
      setLoading(false);
    }
  };

  console.log(errors);

  return (
    <Layout title="Ajouter une video" description="Ajouter une nouvelle video">
      {loading && <Spinner>{progressText}</Spinner>}
      <Card style={{ overflow: "visible" }}>
        <CardBody>
          <h2
            className="mt-0 text-primary"
            style={{ fontWeight: 300, overflow: "visible" }}
          >
            Ajouter une video
          </h2>
          <hr />
          <form onSubmit={handleSubmit(createVideoHandler)}>
            {loading && (
              <Progress
                style={{ marginBottom: 20 }}
                value={progress}
                status="Primary"
              >
                <span
                  style={{
                    display: "inline-block",
                    minWidth: 260,
                    width: "100%",
                  }}
                >
                  {progress}%
                </span>
              </Progress>
            )}
            <Row>
              <Col breakPoint={{ xs: 12, sm: 6 }}>
                <Input size="Large" fullWidth style={{ marginBottom: 15 }}>
                  <input
                    disabled={loading}
                    type="text"
                    placeholder="Titre de la video"
                    {...register("title", {
                      required: {
                        value: true,
                        message: "Vous devez entrer le titre de la video",
                      },
                    })}
                  />
                </Input>
                <Select
                  isDisabled={loading}
                  fullWidth
                  size="Large"
                  placeholder="Categorie de la video"
                  options={Object.keys(CATEGORIES).map((key) => ({
                    value: key,
                    label: CATEGORIES[key],
                  }))}
                  value={category}
                  onChange={(a) => {
                    setCategory(a);
                  }}
                />
                <Input
                  size="Large"
                  fullWidth
                  style={{ marginBottom: 15, marginTop: 15 }}
                >
                  <textarea
                    disabled={loading}
                    rows={6}
                    placeholder="description de la video"
                    {...register("description", {
                      required: {
                        value: true,
                        message: "Vous devez entrer la description de la video",
                      },
                    })}
                  />
                </Input>
                <Input size="Large" fullWidth style={{ marginBottom: 15 }}>
                  <input
                    disabled={loading}
                    type="text"
                    placeholder="bande annonce de la video (lien Youtube)"
                    {...register("trailer", {
                      required: {
                        value: true,
                        message:
                          "Vous devez entrer la bande annonce de la video",
                      },
                    })}
                  />
                </Input>
              </Col>
              <Col breakPoint={{ xs: 12, sm: 6 }}>
                <FilePond
                  disabled={loading}
                  files={cover ? [cover] : []}
                  onupdatefiles={(files) => {
                    files.forEach((pFile) => {
                      setCover(pFile.file);
                    });
                  }}
                  name="cover"
                  acceptedFileTypes={["image/*"]}
                  labelIdle="Placez la couverture"
                />
                <FilePond
                  disabled={loading}
                  files={video ? [video] : []}
                  onupdatefiles={(files) => {
                    files.forEach((pFile) => {
                      setVideo(pFile.file);
                    });
                  }}
                  name="video"
                  acceptedFileTypes={["video/mp4"]}
                  labelIdle="Placez la video ici (.mp4)"
                />
              </Col>
            </Row>
            <Button type="submit" disabled={loading}>
              Ajouter
            </Button>
          </form>
        </CardBody>
      </Card>
    </Layout>
  );
};
export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/auth/login",
})(AddVideo);
