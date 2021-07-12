import * as React from "react";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import { Card, CardBody } from "@paljs/ui/Card";
import { Button, ButtonLink } from "@paljs/ui/Button";
import { useRouter } from "next/router";
import styled from "styled-components";
import Select from "@paljs/ui/Select";
import { InputGroup as Input } from "@paljs/ui/Input";
import ReactHlsPlayer from "react-hls-player";

import Layout from "../../Layouts";
import { BASE_URL, CATEGORIES } from "../../utils";
import { OptionTypeBase } from "react-select";
import { SubmitHandler, useForm } from "react-hook-form";
import Spinner from "@paljs/ui/Spinner";
import axios from "axios";
import { FIRESTORE_CLIENT } from "../../server/FirebaseClient";
import firebase from "firebase";
import Alert from "@paljs/ui/Alert";

const ErrorStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  small {
    margin-bottom: 3rem;
  }
  h1 {
    margin-bottom: 0.5rem;
  }
  a {
    max-width: 20rem;
  }
`;
type Inputs = {
  title: string;
  description: string;
  trailer: string;
};

const CreateLive: React.FC = () => {
  const playerRef = React.useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [live, setLive] = React.useState<any>({}); //TODO CREATE THE LIVE COLLECTION
  const [category, setCategory] = React.useState<OptionTypeBase>(
    Object.keys(CATEGORIES).map((key) => ({
      value: key,
      label: CATEGORIES[key],
    }))[0]
  );

  const createLive: SubmitHandler<Inputs> = async (payload) => {
    setLoading(true);
    let playBackID: string;
    let streamKey: string;
    try {
      const { data } = await axios.get(BASE_URL + "/api/createLive");

      if (!data.success) throw data;

      streamKey = data.data.stream_key;
      playBackID = data.data.playback_ids.map((e: any) => e.id)[0];

      await FIRESTORE_CLIENT.collection("lives")
        .doc(data.data.id)
        .set({
          uploadID: data.data.id,
          status: "CREATED",
          streamKey,
          playBackID,
          createdAt: firebase.firestore.Timestamp.now(),
          ...payload,
        });

      console.log(data);
    } catch (error) {
      alert("Erreur interne");
      console.error(error);
    }
    setLoading(false);
  };

  React.useEffect(
    () =>
      FIRESTORE_CLIENT.collection("lives")
        .where("status", "==", "CREATED")
        .orderBy("createdAt", "desc")
        .limit(1)
        .onSnapshot((e) => {
          if (!e.empty) {
            setLive(e.docs[0].data());
          } else {
            setLive({});
          }
        }),
    []
  );

  return (
    <Layout title="Direct" description="Faire un direct">
      {loading && <Spinner />}
      <Card>
        <CardBody>
          {!live.streamKey ? (
            <form onSubmit={handleSubmit(createLive)}>
              <h1>Faire un direct</h1>
              <Input size="Large" fullWidth style={{ marginBottom: 15 }}>
                <input
                  disabled={loading}
                  type="text"
                  placeholder="Titre du direct"
                  {...register("title", {
                    required: {
                      value: true,
                      message: "Vous devez entrer le titre du direct",
                    },
                  })}
                />
              </Input>
              <Select
                isDisabled={loading}
                fullWidth
                size="Large"
                placeholder="Categorie du direct"
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
                  placeholder="description du direct"
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Vous devez entrer la description du direct",
                    },
                  })}
                />
              </Input>
              <Button appearance="outline" status="Primary" type="submit">
                Commencer
              </Button>
            </form>
          ) : (
            <div>
              <ReactHlsPlayer
                playerRef={playerRef}
                src={`https://stream.mux.com/${live.playBackID}.m3u8`}
                autoPlay={true}
                controls={true}
                width="100%"
                height="auto"
              />
              <Alert status="Basic">
                SERVEUR URL: rtmps://global-live.mux.com:443/app
              </Alert>
              <Alert status="Basic">CLE DU STREAM: {live.streamKey}</Alert>
              <Button status="Danger" onClick={() => {}}>
                Terminer le direct
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </Layout>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/auth/login",
})(CreateLive);
