import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "../App.css";
import { FaAngleUp } from "react-icons/fa";
import { useQuery, gql } from "@apollo/client";
import Spinner from "react-bootstrap/Spinner";

const GET_SURAH_VERSES = gql`
  query GetVerses($chapter: Int!) {
    getsurahverses(chapter: $chapter) {
      success
      message
      verses {
        id
        text_uthmani
        verse_number
        translations {
          id
          text
        }
      }
    }
  }
`;

export default function SpecificCard() {
  const location = useLocation();
  const { chapter_no, title } = location.state;
  const [visible, setVisible] = useState(false);

  const { data, loading, error } = useQuery(GET_SURAH_VERSES, {
    variables: { chapter: Number(chapter_no) },
  });

  const topFunction = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", topFunction);
    return () => {
      window.removeEventListener("scroll", topFunction);
    };
  }, []);

  if (loading)
    return (
      <p>
        <Spinner className="m-4" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </p>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Container className="content-container">
        <h2 className="text-center p-2 my-5">Surah {title}</h2>
        <Row className="gy-3">
          {data.getsurahverses.verses.map((verse) => (
            <Col md={12} key={verse.id} className="verse-container">
              <div className="bg-white rounded p-4 shadow">
                <div className="verse-header text-right mb-3">
                  <h4 className="mb-1 text-dark">{verse.verse_number}</h4>
                  <p className="mb-0 text-secondary">{verse.text_uthmani}</p>
                </div>
                <div>
                  <p className="mb-0 text-dark">
                    {verse.translations[0].text.replace(/<\/?[^>]+(>|$)/g, "")}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {visible && (
          <button
            className="scroll-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <FaAngleUp />
          </button>
        )}
      </Container>
    </div>
  );
}
