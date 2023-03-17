import React, { useState } from "react";
import { db } from "./Firebase";
import { storage } from "./Firebase";
import { Form } from "react-bootstrap";
import { ref, set } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import './Clubs.css';

export default function ClubsForm() {
    const [clubType, setClubType] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [website, setWebsite] = useState("");
    const [url, setURL] = useState("");
    const [imageUpload, setImageUpload] = useState(null);

    const clubForm = async (e) => {
      e.preventDefault();
      const path = "/clubs/" + url;
      const clubRef = ref(db, path);
      const imageRef = storageRef(storage, `clubImages/${url}`);
      uploadBytes(imageRef, imageUpload).then(() =>
        console.log("image uploaded")
      );
      const imageUrl = await getDownloadURL(imageRef);

      set(clubRef, {
        clubType: clubType,
        description: description,
        name: name,
        nickname: nickname,
        rating: [1, 1, 1, 1, 1],
        socials:{
          Facebook: facebook,
          Instagram: instagram,
        },
        website: website,
        url: url,
        createdAt: new Date().getTime(),
        imageUrl: imageUrl
      })
      .then(() =>{
      alert('Club data submitted');
      window.location.reload();
      })
      .catch((error) => { 
        console.log(error);
      }) 
    }
    return (
        <div> 
        <Form className="clubForm" onSubmit={clubForm}>
            <h1>Submit a Club</h1>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Club Name</Form.Label>
                <Form.Control type="text" required placeholder="Club Name" value={name} onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Club Nickname</Form.Label>
              <Form.Control type="text" placeholder="Club Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Facebook</Form.Label>
              <Form.Control type="text" placeholder="Facebook" value={facebook} onChange={(e) => setFacebook(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Club Instagram Page</Form.Label>
              <Form.Control type="text" required placeholder="Instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Club Description</Form.Label>
              <Form.Control as="textarea"required placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
              <Form.Label>Desired BClub URL</Form.Label>
                <Form.Control type="text" required placeholder="URL" value={url} onChange={(e) => setURL(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
              <Form.Label>External Club Website</Form.Label>
                <Form.Control type="text" placeholder="Website" value={website} onChange={(e) => setWebsite(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput9">
              <Form.Label>Club Image</Form.Label>
              <Form.Control required type="file" accept="image/*" onChange={(e) => setImageUpload(e.target.files[0])} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
              <Form.Select required value={clubType} onChange={(e) => setClubType(e.target.value)}>
                  <option value="" disabled selected>Select a Category</option>
                  <option value="Academic">Academic</option>
                  <option value="Arts">Arts</option>
                  <option value="Career">Career</option>
                  <option value="Community Service">Community Service</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Technological">Technological</option>
                  <option value="Recreational">Recreational</option>
                  <option value="Other">Other</option>  
              </Form.Select>
              <button className="clubFormButton" type="submit">Submit</button>
            </Form.Group>
        </Form>
        </div>
    );
}