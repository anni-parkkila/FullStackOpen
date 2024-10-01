import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientInfoPage from "./components/PatientInfo";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient>();
  const match = useMatch("/patients/:id");

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
      const one = await patientService.getById(
        "d2773336-f723-11e9-8f0b-362b9e155667"
      );
      console.log("one", one);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    console.log("match", match);
    if (match && match.params.id) {
      const findPatientInfo = async () => {
        const patient = await patientService.getById(match.params.id);
        setPatient(patient);
      };
      void findPatientInfo();
    }
  }, [match]);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/patients/:id"
            element={<PatientInfoPage patient={patient} />}
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
