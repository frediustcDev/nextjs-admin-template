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

registerPlugin(FilePondPluginImagePreview);

const AddVideo = () => {
  const [video, setVideo] = React.useState<File>(null);
  const [cover, setCover] = React.useState<File>(null);

  const CATEGORIES = {
    all: "Tout",
    predications: "Prédications",
    seminaires: "Séminaires",
    "l-ecole-du-potier": "L'école du potier",
    "le-culte-des-leaders": "Le culte des leaders",
    "restauration-des-fondements": "Restauration des fondements",
    "cultes-d-actions-de-grace": "Cultes d'actions de grâce",
    "atmosphere-de-miracles": "Atmosphère de miracles",
  };

  return (
    <Layout title="Ajouter une video" description="Ajouter une nouvelle video">
      <Card style={{ overflow: "visible" }}>
        <CardBody>
          <h2
            className="mt-0 text-primary"
            style={{ fontWeight: 300, overflow: "visible" }}
          >
            Ajouter une video
          </h2>
          <hr />
          <form>
            <Progress style={{ marginBottom: 20 }} value={70} status="Primary">
              <span style={{ display: "inline-block", width: 260 }}>
                Publication de la couverture (100%)
              </span>
            </Progress>
            <Row>
              <Col breakPoint={{ xs: 12, sm: 6 }}>
                <Input size="Large" fullWidth style={{ marginBottom: 15 }}>
                  <input type="text" placeholder="Titre de la video" />
                </Input>
                <Select
                  fullWidth
                  size="Large"
                  placeholder="Categorie de la video"
                  options={Object.keys(CATEGORIES).map((key) => ({
                    value: key,
                    label: CATEGORIES[key],
                  }))}
                />
                <Input
                  size="Large"
                  fullWidth
                  style={{ marginBottom: 15, marginTop: 15 }}
                >
                  <textarea rows={6} placeholder="description de la video" />
                </Input>
                <Input size="Large" fullWidth style={{ marginBottom: 15 }}>
                  <input
                    type="text"
                    placeholder="bande annonce de la video (lien Youtube)"
                  />
                </Input>
              </Col>
              <Col breakPoint={{ xs: 12, sm: 6 }}>
                <FilePond
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
                <FilePond
                  files={cover ? [cover] : []}
                  onupdatefiles={(files) => {
                    files.forEach((pFile) => {
                      setCover(pFile.file);
                    });
                  }}
                  allowMultiple={false}
                  maxFiles={1}
                  name="cover"
                  acceptedFileTypes={["image/*"]}
                  labelIdle="Placez la couverture de la video"
                />
              </Col>
            </Row>
            <Button disabled>Ajouter</Button>
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
