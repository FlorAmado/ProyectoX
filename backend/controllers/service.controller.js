const Service = require('../models/Service.js');

// 1. GET /api/services?salonId=... (Devuelve todos los servicios de un salón específico)
const getServices = async (req, res) => {
    try {
        const { salonId } = req.query; 

        if (!salonId) {
            return res.status(400).json({ ok: false, msg: "Falta el salonId para filtrar los servicios" });
        }

        const services = await Service.find({ salonId });
        return res.status(200).json({ ok: true, data: services });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Error al obtener los servicios" });
    }
};

// 2. POST /api/services (Crea un nuevo servicio - Protegido)
const createService = async (req, res) => {
    try {
        const { salonId, name, description, duration, price, depositAmount } = req.body;

        if (!salonId || !name || !duration || !price || depositAmount === undefined) {
            return res.status(400).json({ ok: false, msg: "Faltan campos obligatorios" });
        }

        const newService = new Service({
            salonId,
            name,
            description,
            duration,
            price,
            depositAmount
        });

        await newService.save();
        return res.status(201).json({ ok: true, data: newService });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Error al crear el servicio" });
    }
};

// 3. PUT /api/services/:id (Edita un servicio por ID)
const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        
        const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!updatedService) {
            return res.status(404).json({ ok: false, msg: "Servicio no encontrado" });
        }

        return res.status(200).json({ ok: true, data: updatedService });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Error al actualizar el servicio" });
    }
};

// 4. DELETE /api/services/:id (Borra un servicio por ID)
const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedService = await Service.findByIdAndDelete(id);
        
        if (!deletedService) {
            return res.status(404).json({ ok: false, msg: "Servicio no encontrado" });
        }

        return res.status(200).json({ ok: true, msg: "Servicio eliminado correctamente" });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Error al eliminar el servicio" });
    }
};

module.exports = {
    getServices,
    createService,
    updateService,
    deleteService
};