import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FaCircle } from 'react-icons/fa'


function SurahCard(props) {
  return (
    <Card className='w-100 mt-2 hoverable'>
      <Card.Body>
        <Container>
          <Row>
            <Col md={6}>
              <h4>{props.id}</h4>
              <Card.Title>{props.title}</Card.Title>
              <Card.Subtitle className="mb-2" style={{color:"#61B198"}} >{props.othertitle}</Card.Subtitle>
              <FaCircle color='#ffc800'/>
            </Col>

            <Col md={6} >
              <img className="card-img" src="./quran-icon1.png" alt="Card cap" />
            </Col>
         
          </Row> 
          
        </Container>
        
      
      </Card.Body>
    </Card>
  );
}

export default SurahCard;