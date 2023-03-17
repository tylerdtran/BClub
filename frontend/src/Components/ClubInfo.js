// Equivalent to frat summary 

import { Card, Container, Col, Row, Stack } from 'react-bootstrap'
import { RatingBar } from './RatingBar'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkIcon from '@mui/icons-material/Link';
import { useState, useEffect } from 'react'

export function ClubInfo(props) {

        return (
            <div>
                <Container>
                    <Row>
                        <Col className='p-0'>
                            <Card >
                                <Card.Body>
                                    <Stack direction='horizontal' gap={2} className='d-flex justify-content-center'>
                                        <h3>{props?.data?.name}</h3>
                                    </Stack>
                                    <Container>
                                        <Stack direction='horizontal' gap={5} className='justify-content-center'>
                                            <Stack direction='horizontal' gap={2} className='d-flex justify-content-center'>
                                                <h5>Overall Rating:</h5>
                                                <h5>{props?.data?.rating?.overall || 'N/A'}</h5>
                                            </Stack>
                                            <Stack direction='horizontal' gap={2} className='d-flex justify-content-center'>
                                                <h5>Club Type:</h5>
                                                <h5>{props?.data?.clubType}</h5>
                                            </Stack>
                                        </Stack>
                                    </Container>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                        <Row className='mt-4'>
                            <Col style={{ paddingRight: 20 }}>
                                <Card className='h-100'>
                                    <Card.Body className='d-flex flex-column justify-content-between pb-4'>
                                        <div>
                                            <Card.Title>Information</Card.Title>
                                            <hr />
                                            {props?.data?.nickname && <Card.Text>Nickname: {props?.data?.nickname}</Card.Text>}
                                            {props?.data?.clubType && <Card.Text>Club Type: {props?.data?.clubType}</Card.Text>}
                                            {props?.data?.description && <Card.Text>Description: {props?.data?.description}</Card.Text>}
                                        </div>
                                        <Stack direction='horizontal' className='d-flex justify-content-center align-items-baseline' gap={4}>
                                            {props?.data?.socials?.Instagram && <Card.Text style={{ marginBottom: 0 }}><InstagramIcon /> <a href={props?.data?.socials?.Instagram}>Instagram</a></Card.Text>}
                                            {props?.data?.socials?.Facebook && <Card.Text style={{ marginBottom: 0 }}><FacebookIcon /> <a href={props?.data?.socials?.Facebook}>Facebook</a></Card.Text>}
                                            {props?.data?.website && <Card.Text style={{ marginBottom: 0 }}><LinkIcon /> <a href={props?.data?.website}>Website</a></Card.Text>}
                                        </Stack> 
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col style={{ paddingLeft: 20 }}>
                                <Card className='h-100'>
                                    <Card.Body className='d-flex flex-column justify-content-between pb-4'>
                                        <RatingBar title="Activeness" rating={props?.data?.rating?.activeness} />
                                        <RatingBar title="Community" rating={props?.data?.rating?.community} />
                                        <RatingBar title="Competitiveness" rating={props?.data?.rating?.competitiveness} />
                                        <RatingBar title="Fun" rating={props?.data?.rating?.fun} />
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                </Container>
            </div>
        );
    }

/* 
{props.showInfo === 'false' ?
                        <Row className='mt-4'>
                            <Col className='p-0'>
                                <Card className='h-100'>
                                    <Card.Body className='d-flex flex-column justify-content-between pb-4'>
                                        <RatingBar title="Activeness" rating={props?.rating?.activeness} />
                                        <RatingBar title="Community" rating={props?.rating?.community} />
                                        <RatingBar title="Competitiveness" rating={props?.rating?.competitiveness} />
                                        <RatingBar title="Fun" rating={props?.rating?.fun} />
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        :*/
