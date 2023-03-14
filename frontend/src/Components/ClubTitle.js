// import { Card, Container, Col, Row, Stack } from 'react-bootstrap';

// function ClubTitle(props) {
//     return (
//         <Row>
//             <Col className='p-0'>
//                 <Card >
//                     <Card.Body>
//                         <Stack direction='horizontal' gap={2} className='d-flex justify-content-center'>
//                             <h3>{props?.data?.name}</h3>
//                         </Stack>
//                         <Container>
//                             <Stack direction='horizontal' gap={5} className='justify-content-center'>
//                                 <Stack direction='horizontal' gap={2} className='d-flex justify-content-center'>
//                                     <h4>Overall Rating:</h4>
//                                     <h4 className={highlight}>{props?.data?.rating?.overall || 'N/A'}</h4>
//                                 </Stack>
//                                 <Stack direction='horizontal' gap={2} className='d-flex justify-content-center'>
//                                     <h4>Club Type:</h4>
//                                     <h4 className='hl-info'>{props?.data?.rating?.rep}</h4>
//                                 </Stack>
//                             </Stack>
//                         </Container>
//                     </Card.Body>
//                 </Card>
//             </Col>
//         </Row>
//     );
// }
// export { ClubTitle };