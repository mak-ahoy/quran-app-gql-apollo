import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SurahCard from '../components/SurahCard';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { FaAngleUp } from 'react-icons/fa';
import { useQuery, gql } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from 'react-redux'
import { useAuth } from '../contexts/useAuth';

export default function Home() {
    const [surahs, setSurahs] = useState([]);
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const user = useSelector(state => state)
    const obj = useAuth();


    console.log(obj.user)


    const GET_SURAH = gql`
    query GetSurahs {
        getsurah {
            success
            message
            surahs {
                id
                name_simple
                name_arabic
            }
        }
    }
    `;
    const { loading, error, data } = useQuery(GET_SURAH);

    const topFunction = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const handleClick = (e, id, surah_name) => {
        e.preventDefault();
        navigate('/home/surah', { state: { chapter_no: id, title: surah_name } });
    };

    useEffect(() => {

        if (data && data.getsurah && data.getsurah.surahs) {
            setSurahs(data.getsurah.surahs);
        }
        window.addEventListener('scroll', topFunction);
        return () => {
            window.removeEventListener('scroll', topFunction);

        };
    }, [data]); 


    

    if (loading) return (
        <Spinner className="m-4" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );

    if (error) return (
        <Alert key={'danger'} variant={'danger'}>
            An Error Occurred: {error.message}
        </Alert>
    );

    return (
        <>
            <div className='background-img'>
                <Container className='d-flex justify-content-center flex-wrap '>
                    <Row>
                        <Col md={12}>
                            <h1 className='text-light text-center mt-4'>Welcome to the Quran App</h1>
                        </Col>
                    </Row>

                    <Container className='mt-5 d-flex justify-content-center'>
                        <Row className='h-auto'>
                            {surahs.map((element, index) => (
                                <Col sm={4} md={3} key={index}>
                                    <Link className='text-decoration-none' onClick={(e) => handleClick(e, element.id, element.name_simple)}>
                                        <SurahCard title={element.name_simple} othertitle={element.name_arabic} id={element.id} />
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </Container>

                    <button
                        style={{ display: visible ? 'block' : 'none' }}
                        className='scroll-to-top'
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <FaAngleUp />
                    </button>
                </Container>
            </div>
        </>
    );
}
