import { Tab, Tabs } from "react-bootstrap";
import { Order } from "./Order";
import { Review } from "./Review";
import { Profile } from "./Profile";
import { Password } from "./Password";

export const Dashboard = () => {
    return (
        <div className="col-12">
            <div className="row">
                <div className="col-12 mt-3 text-center text-uppercase">
                    <h2>User Dashboard</h2>
                </div>
            </div>

            <main className="row">
                <div className="col-lg-8 col-md-10 col-sm-12 mx-auto bg-white py-3 mb-4">
                    <Tabs
                        defaultActiveKey="orders"
                        id="justify-tab-example"
                        className="mb-3"
                        justify
                    >
                        <Tab eventKey="orders" title={<><i className="fa-solid fa-gifts me-2"></i>ORDERS</>}>
                            <Order />
                        </Tab>
                        <Tab eventKey="reviews" title={<><i className="fa-solid fa-comment me-2"></i>REVIEWS</>}>
                            <Review />
                        </Tab>
                        <Tab eventKey="profile" title={<><i className="fa-solid fa-user-edit me-2"></i>EDIT PROFILE</>}>
                            <Profile />
                        </Tab>
                        <Tab eventKey="password" title={<><i className="fa-solid fa-asterisk me-2"></i>CHANGE PASSWORD</>}>
                            <Password />
                        </Tab>
                    </Tabs>

                </div>
            </main>
        </div>
    );
};
