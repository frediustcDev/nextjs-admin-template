import * as React from "react";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import Layout from "../../Layouts";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import { Card, CardBody } from "@paljs/ui/Card";
import { EvaIcon } from "@paljs/ui/Icon";
import { Button } from "@paljs/ui/Button";
import { IVideosCollection } from "../../utils";
import { FIRESTORE_CLIENT } from "../../server/FirebaseClient";
import firebase from "firebase";
import moment from "moment";

const Videos = () => {
  const [videos, setVideos] = React.useState<IVideosCollection[]>([]);

  const getVideos = async () => {
    try {
      const _videosResult = await FIRESTORE_CLIENT.collection("videos")
        .orderBy("createdAt", "desc")
        .get();

      const _videos: IVideosCollection[] = _videosResult.docs.map((doc, i) => {
        const _data: any = doc.data();

        return {
          _id: doc.id,
          ..._data,
          createdAt: moment(
            (_data.createdAt as firebase.firestore.Timestamp).toDate()
          ).format("DD MMMM YYYY"),
        };
      });

      setVideos(_videos);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getVideos();
  }, []);

  return (
    <Layout title="Videos" description="Liste de tous vos videos">
      <Row>
        {videos.map((video, i) => (
          <Col
            key={video._id}
            breakPoint={{ xs: 12, sm: 12, md: 6, xl: 4, xxxl: 3 }}
          >
            <Card style={{ overflow: "hidden" }}>
              <div className="card" style={{ minHeight: 405 }}>
                <div className="card-cover">
                  <div
                    style={{
                      height: 200,
                      width: "100%",
                      backgroundImage: `url('${video.coverURL}')`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  />
                  {/* <img src={video.coverURL} className="w-100" alt="cover" /> */}
                </div>
                <CardBody>
                  <div className="card-body">
                    <h5 className="card-title mt-0">{video.title}</h5>
                    <p className="card-description mt-0">{video.description}</p>
                  </div>
                  <hr />
                  <Row>
                    <Col breakPoint={{ xs: 4 }}>
                      <Button fullWidth appearance="outline" status="Primary">
                        <EvaIcon name="eye-outline" />
                      </Button>
                    </Col>
                    <Col breakPoint={{ xs: 4 }}>
                      <Button fullWidth appearance="outline" status="Warning">
                        <EvaIcon name="edit-outline" />
                      </Button>
                    </Col>
                    <Col breakPoint={{ xs: 4 }}>
                      <Button fullWidth appearance="outline" status="Danger">
                        <EvaIcon name="trash-outline" />
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Layout>
  );
};
export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/auth/login",
})(Videos);
