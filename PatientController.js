// TODO 4: SETUP CONTROLLER
const Patient = require("../models/patientModel.js");
const { body } = require('express-validator');
const { validationResult } = require('express-validator/check');

class PatientController {
    async index(req, res) {
        const Patients = await Patient.all();

        if (Patients.length > 0) {
            const response = {
                "message": "Get all patients",
                "data": Patients
            }
            
            res.status(200).json(response);
        } else {
            const response = {
                "message": "Data is empty"
            }

            res.status(200).json(response);
        }
        
    }

    async show(req, res) {
        const { id } = req.params;
        const dataPatient = await Patient.find(id);
        if (dataPatient.length > 0) {
            const response = {
                "message": "get patients by id",
                "data": dataPatient
            }

            res.status(200).json(response);
        } else {
            const response = {
                "message": "patient not found"
            }

            res.status(404).json(response);
        }
    }

    async store(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        } else {
            const patient = await Patient.create(
                {
                    name : req.body.name,
                    phone : req.body.phone,
                    address : req.body.address,
                    status_id : req.body.status_id,
                    in_date_at : new Date()
                }
            );

            const response = {
                "message": "Success store patient data",
                "data": patient
            }

            res.status(201).json(response);
        }
    }


    async update(req, res) {
        const { id } = req.params;
        const dataPatient = await Patient.find(id);

        if (dataPatient.length > 0) {
            const updateData = await Patient.update(id, req.body);
            const response = {
                "message": "success update patient data",
                "data": updateData
            }

            res.status(200).json(response);
        } else {
            const response = {
                "message": "patient not found"
            }

            res.status(404).json(response);
        }
    }

    async destroy(req, res) {
        const { id } = req.params;
        const dataPatient = await Patient.find(id);

        if (dataPatient.length > 0) {
            await Patient.delete(id);
            const response = {
                "message": "success delete patient data",
                "data": dataPatient
            }

            res.status(200).json(response);
        } else {
            const response = {
                "message": "patient not found"
            }

            res.status(404).json(response);
        }
    }

    async search(req, res) {
        const { name } = req.params;
        const dataPatient = await Patient.search(name);
        if (dataPatient.length > 0) {
            const response = {
                "message": "success search data patient",
                "data": dataPatient
            }

            res.status(200).json(response);
        } else {
            const response = {
                "message": "patient not found"
            }

            res.status(404).json(response);
        }
    }

    async positive(req, res) {
        const status = "positive";
        const dataPatient = await Patient.findByStatus(status);
        const total_data = dataPatient.length;
        if (dataPatient.length > 0) {
            const response = {
                "Message": "Get Patient Positive",
                "Total Patient": total_data,
                "Data Patient":dataPatient
            }

            res.status(200).json(response);
        } else {
            const response = {
                "message": "patient not found"
            }

            res.status(404).json(response);
        }
    }

    async recovered(req, res) {
        const status = "recovered";
        const dataPatient = await Patient.findByStatus(status);
        const total = dataPatient.length;
        if (dataPatient.length > 0) {
            const response = {
                "Message": "Get Pasient Recovered",
                "Total Patient": total,
                "Data Patient": dataPatient
            }

            res.status(200).json(response);
        } else {
            const response = {
                "message": "patient not found"
            }

            res.status(404).json(response);
        }
    }

    async dead(req, res) {
        const status = "dead";
        const dataPatient = await Patient.findByStatus(status);
        const total = dataPatient.length;
        if (dataPatient.length > 0) {
            const response = {
                "Message": "Get Pasient Dead",
                "Total Patient": total,
                "Data Patient": dataPatient
            }

            res.status(200).json(response);
        } else {
            const response = {
                "message": "patient not found"
            }

            res.status(404).json(response);
        }
    }

    validate(method){
        switch (method) {
            case 'store': {
            return [ 
                    body('name', "name is required").notEmpty(),
                    body('address', 'address is required').notEmpty(),
                    body('phone',"phone is required and is number").notEmpty().isInt(),
                    body('status_id','status is required').isIn(['1', '2', '3']).notEmpty()
                ]   
            }
        }
    }
}

const controller = new PatientController();
module.exports = controller; 