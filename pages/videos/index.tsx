import * as React from "react";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import Layout from "../../Layouts";
import Row from "@paljs/ui/Row";
import Col from "@paljs/ui/Col";
import { Card, CardBody } from "@paljs/ui/Card";
import { EvaIcon } from "@paljs/ui/Icon";
import { Button } from "@paljs/ui/Button";

const Videos = () => {
  return (
    <Layout title="Videos" description="Liste de tous vos videos">
      <Row>
        {[...Array(12)].map((_, i) => (
          <Col key={i} breakPoint={{ xs: 12, sm: 12, md: 6, xl: 4, xxxl: 3 }}>
            <Card style={{ overflow: "hidden" }}>
              <div className="card">
                <div className="card-cover">
                  <img src="/praise.jpg" className="w-100" alt="cover" />
                </div>
                <CardBody>
                  <div className="card-body">
                    <h5 className="card-title mt-0">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </h5>
                    <p className="card-description mt-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Dolores repellendus facilis fuga veritatis ducimus
                      molestiae temporibus autem iusto!
                    </p>
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
