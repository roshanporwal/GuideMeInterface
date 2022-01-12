

//new Consulation form done
const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    let data = localStorage.getItem("login")
    data = JSON.parse(data)

    formValues.patient_id = data._id;
    formValues.patient_name = data.name;
    formValues.type = "new_consulation";


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('insurance_card_copy', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const createNewConsulation = await auth_service.createNewConsulation(data.login_id, formData)
    
}



//free_surgical_opinion create done
const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    let data = localStorage.getItem("login")
    data = JSON.parse(data)

    formValues.patient_id = data._id;
    formValues.patient_name = data.name;
    formValues.type = "free_surgical_opinion";
    // formValues.basetype = "second_consulation"


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('insurance_card_copy', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createSecondConsulation(data.login_id, formData)
    
}



//international_opinion create done
const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    let data = localStorage.getItem("login")
    data = JSON.parse(data)

    formValues.patient_id = data._id;
    formValues.patient_name = data.name;
    formValues.type = "international_opinion";
    // formValues.basetype = "second_consulation"


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('insurance_card_copy', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createSecondConsulation(data.login_id, formData)
    
}


//rcpcrtest create done
const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    let data = localStorage.getItem("login")
    data = JSON.parse(data)

    formValues.patient_id = data._id;
    formValues.patient_name = data.name;
    formValues.type = "rcpcrtest";
    


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('insurance_card_copy', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createHomeService(data.login_id, formData)
    
}

//teleconsulation done
const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    let data = localStorage.getItem("login")
    data = JSON.parse(data)

    formValues.patient_id = data._id;
    formValues.patient_name = data.name;
    formValues.type = "teleconsulation";
    


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('insurance_card_copy', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createHomeService(data.login_id, formData)
    
}

//doctorhomevist create done
const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    let data = localStorage.getItem("login")
    data = JSON.parse(data)

    formValues.patient_id = data._id;
    formValues.patient_name = data.name;
    formValues.type = "doctorhomevist";
    


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('insurance_card_copy', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createHomeService(data.login_id, formData)
    
}




//physiotherapy create done
const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    let data = localStorage.getItem("login")
    data = JSON.parse(data)

    formValues.patient_id = data._id;
    formValues.patient_name = data.name;
    formValues.type = "physiotherapy";
    


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('insurance_card_copy', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createHomeService(data.login_id, formData)
    
}




//nursingservice create done
const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    let data = localStorage.getItem("login")
    data = JSON.parse(data)

    formValues.patient_id = data._id;
    formValues.patient_name = data.name;
    formValues.type = "nursingservice";
    


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('insurance_card_copy', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createHomeService(data.login_id, formData)
    
}







//lab form done
const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    let data = localStorage.getItem("login")
    data = JSON.parse(data)

    formValues.patient_id = data._id;
    formValues.patient_name = data.name;
    formValues.type = "lab";


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('insurance_card_copy', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createlab(data.login_id, formData)
    
}


//xray create done
const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    let data = localStorage.getItem("login")
    data = JSON.parse(data)

    formValues.patient_id = data._id;
    formValues.patient_name = data.name;
    formValues.type = "xray";
    


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('prescription', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createDiagnostics(data.login_id, formData)
    
}


//mammogram create done
const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    let data = localStorage.getItem("login")
    data = JSON.parse(data)

    formValues.patient_id = data._id;
    formValues.patient_name = data.name;
    formValues.type = "mammogram";
    


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('prescription', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createDiagnostics(data.login_id, formData)
    
}


//ctscan create done
const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    let data = localStorage.getItem("login")
    data = JSON.parse(data)

    formValues.patient_id = data._id;
    formValues.patient_name = data.name;
    formValues.type = "ctscan";
    


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('prescription', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createDiagnostics(data.login_id, formData)
    
}


//mri create done
const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    let data = localStorage.getItem("login")
    data = JSON.parse(data)

    formValues.patient_id = data._id;
    formValues.patient_name = data.name;
    formValues.type = "mri";
    


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('prescription', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createDiagnostics(data.login_id, formData)
    
}



//ultrasound create done
const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    let data = localStorage.getItem("login")
    data = JSON.parse(data)

    formValues.patient_id = data._id;
    formValues.patient_name = data.name;
    formValues.type = "ultrasound";
    


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('prescription', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createDiagnostics(data.login_id, formData)
    
}

