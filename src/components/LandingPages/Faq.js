import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config/api";
import { useNavigate } from "react-router-dom";

const Faq = () => {
  const navigate = useNavigate();
  const [faq, setfaq] = useState([]);
  const [loader, setloader] = useState(true);

  useEffect(() => {
    getFaq();
  }, []);

  const getFaq = () => {
    setloader(true);
    axios
      .get(`${BASE_URL}/faqs`)
      .then((res) => {
        setfaq(res.data.data);
        setloader(false);
      })
      .catch((err) => {
        toast.error(err.response.data.meta.message);
        setloader(false);
        if(err?.response?.data?.meta?.message === "Token expired."){
          localStorage.removeItem("auth_token");
          localStorage.removeItem("isGuest")
          navigate("/", { replace: true });
          window.location.reload(false);
        }
      });
  };
  return (
    <>
      <div className="container_fluid faq_page">
        {!loader ? (
         <div className="row my-5 py-5">
              <div className="faq_accordion">
                <Accordion defaultActiveKey="0">
                  {faq.map((data) => (
                    <Accordion.Item eventKey={data.id} key={data.id}>
                      <Accordion.Header>{data.question}</Accordion.Header>
                      <Accordion.Body>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: data.answer,
                          }}
                        ></p>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </div>
        ) : (
          <div className="load_spinner">
            <TailSpin color="#000000" height={60} width={60} />
          </div>
        )}
      </div>
    </>
  );
};
export default Faq;
