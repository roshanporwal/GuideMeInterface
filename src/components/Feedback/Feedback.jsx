import { useState, useEffect } from "react";
import * as auth_service from "../../services/auth_service";
import ReactGifLoader from "../../interfacecomponents/gif_loader";
import ReactStars from "react-rating-stars-component";

function Feedback({ handleModalShow }) {
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [show, setShow] = useState(false);

  const handleOthersField = () => {
    setShow(!show);
  };

  const [islowrating, setIsLowRating] = useState(null);
//   const [formValues, setFormValue] = useState({
//     commission: "",
//     transaction: "",
//     id: "",
//     communication_skills: "",
//     care_and_hospitality: "",
//     hospital_infrastructure: "",
//     transparency: "",
//     overall_outcome: "",
//     other_rating: "",
//   });
  const [feedbackmessage, setFeedbackmessgae] = useState("");
  useEffect(() => {
    fetchData().then(() => setLoading(false));
  }, []);

  const [data, setData] = useState();

  async function fetchData() {
    let data = localStorage.getItem("login_patient");
    if (data !== null) {
      data = JSON.parse(data);
      setData(data);
    }
  }

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const checklowRating = async () => {
    if (rating < 4 && feedbackmessage === "") {
      setIsLowRating(true);
    } else {
      const res = {
        feedbackmessage: feedbackmessage,
        feedbackrating: rating,
        patient_name: data.name,
        current_diagnosis: data.current_diagnosis,
        id: data._id,
      };
      const feedback = await auth_service.feedback(
        data._id,
        data.login_id,
        res
      );
      if (feedback.payload) {
        setIsLowRating(false);
      }
    }
  };
  if (loading === true)
    return (
      <>
        <ReactGifLoader />
      </>
    );
  else
    return (
      <>
        <div className="form-container">
          <div className="row text-center">
            <h2 className="rating">Please rate us!</h2>
            <div className="offset-md-3">
                <ReactStars
                count={5}
                onChange={ratingChanged}
                size={42}
                activeColor="#ffd700"
                />
            </div>
          </div>
          {islowrating ? (
            <div className="col-md-12">
              <div className="ratingBox">
                <h4>
                  We understand that there are certain areas where we need to
                  improve our level of services further. Please let us know
                  where you would want to focus the most.
                </h4>
                <hr />
                <div>
                  <form>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="rating"
                        value=" Communication Skills of Professionals"
                        id="communication_skills"
                        onClick={() =>
                          setFeedbackmessgae(
                            " Communication Skills of Professionals"
                          )
                        }
                      />
                      <label className="form-check-label">
                        {" "}
                        Communication Skills of Professionals
                      </label>
                    </div>
                    <div className="form-check">
                      <label>Care and Hospitality of other professionals</label>
                      <input
                        type="checkbox"
                        name="rating"
                        id="care_and_hospitality"
                        value="Care and Hospitality of other professionals"
                        className="form-check-input"
                        onClick={() =>
                          setFeedbackmessgae(
                            "Care and Hospitality of other professionals"
                          )
                        }
                      />
                    </div>
                    <div className="form-check">
                      <label>Hospital Infrastructure</label>
                      <input
                        type="checkbox"
                        name="rating"
                        id="hospital_infrastructure"
                        value="Hospital Infrastructure"
                        className="form-check-input"
                        onClick={() =>
                          setFeedbackmessgae("Hospital Infrastructure")
                        }
                      />
                    </div>
                    <div className="form-check">
                      <label>Transparency in Communication</label>
                      <input
                        type="checkbox"
                        label="Transparency in Communication"
                        id="transparency"
                        value="Transparency in Communication"
                        className="form-check-input"
                        name="rating"
                        onClick={() =>
                          setFeedbackmessgae("Transparency in Communication")
                        }
                      />
                    </div>
                    <div className="form-check">
                      <label>Overall outcome of treatment</label>
                      <input
                        type="checkbox"
                        name="rating"
                        id="overall_outcome"
                        value="Overall outcome of treatment"
                        className="form-check-input"
                        onClick={() =>
                          setFeedbackmessgae("Overall outcome of treatment")
                        }
                      />
                    </div>
                    <div className="form-check">
                      <label>Other</label>
                      <input
                        type="checkbox"
                        label="Other"
                        id="other_text"
                        name="other_text"
                        value="Other_text"
                        onChange={handleOthersField}
                        className="form-check-input"
                      />
                    </div>
                    {show ? (
                      <div className="form-check">
                        <input
                          type="text"
                          label="Other"
                          id="other"
                          name="rating"
                          className="form-control"
                          style={{ width: "5 rem" }}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
              </div>
            </div>
          ) : islowrating == null ? (
            ""
          ) : (
            <div>
              <h3>Thankyou!</h3>
            </div>
          )}
          <div className="offset-lg-5 col-md-2 my-2">
            <div
              style={{ width: "150%", letterSpecing: 1 }}
              onClick={checklowRating}
              className="btn btn-warning"
            >
              SEND
            </div>
          </div>
        </div>
      </>
    );
}
export default Feedback;
