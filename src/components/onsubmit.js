

//new Consulation form
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const formData = new FormData();

    formValues.patient_id = 2;
    formValues.patient_name = "nik";
    formValues.type = "new_consulation";


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('insurance_card_copy', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const createNewConsulation = await auth_service.createNewConsulation("admin", formData)
    console.log(createNewConsulation)
}



//free_surgical_opinion create
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const formData = new FormData();

    formValues.patient_id = 3;
    formValues.patient_name = "nik";
    formValues.type = "free_surgical_opinion";
    formValues.basetype = "second_consulation"


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('insurance_card_copy', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createSecondConsulation("admin", formData)
    console.log(abc)
}



//international_opinion create
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const formData = new FormData();

    formValues.patient_id = 4;
    formValues.patient_name = "nik";
    formValues.type = "international_opinion";
    formValues.basetype = "second_consulation"


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('insurance_card_copy', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createSecondConsulation("admin", formData)
    console.log(abc)
}


//rcpcrtest create
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const formData = new FormData();

    formValues.patient_id = 4;
    formValues.patient_name = "nik";
    formValues.type = "rcpcrtest";
    formValues.basetype = "home_service"


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('insurance_card_copy', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createHomeService("admin", formData)
    console.log(abc)
}

//teleconsulation
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const formData = new FormData();

    formValues.patient_id = 4;
    formValues.patient_name = "nik";
    formValues.type = "teleconsulation";
    formValues.basetype = "home_service"


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('insurance_card_copy', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createHomeService("admin", formData)
    console.log(abc)
}

//doctorhomevist create
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const formData = new FormData();

    formValues.patient_id = 4;
    formValues.patient_name = "nik";
    formValues.type = "doctorhomevist";
    formValues.basetype = "home_service"


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('insurance_card_copy', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createHomeService("admin", formData)
    console.log(abc)
}




//physiotherapy create
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const formData = new FormData();

    formValues.patient_id = 4;
    formValues.patient_name = "nik";
    formValues.type = "physiotherapy";
    formValues.basetype = "home_service"


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('insurance_card_copy', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createHomeService("admin", formData)
    console.log(abc)
}




//nursingservice create
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const formData = new FormData();

    formValues.patient_id = 4;
    formValues.patient_name = "nik";
    formValues.type = "nursingservice";
    formValues.basetype = "home_service"


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('insurance_card_copy', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createHomeService("admin", formData)
    console.log(abc)
}







//lab form
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const formData = new FormData();

    formValues.patient_id = 2;
    formValues.patient_name = "nik";
    formValues.type = "lab";


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('insurance_card_copy', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createlab("admin", formData)
    console.log(abc)
}


//xray create
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const formData = new FormData();

    formValues.patient_id = 2;
    formValues.patient_name = "nik";
    formValues.type = "xray";
    formValues.basetype = "diagnostics"


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('prescription', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createDiagnostics("admin", formData)
    console.log(abc)
}


//mammogram create
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const formData = new FormData();

    formValues.patient_id = 2;
    formValues.patient_name = "nik";
    formValues.type = "mammogram";
    formValues.basetype = "diagnostics"


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('prescription', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createDiagnostics("admin", formData)
    console.log(abc)
}


//ctscan create
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const formData = new FormData();

    formValues.patient_id = 2;
    formValues.patient_name = "nik";
    formValues.type = "ctscan";
    formValues.basetype = "diagnostics"


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('prescription', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createDiagnostics("admin", formData)
    console.log(abc)
}


//mri create
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const formData = new FormData();

    formValues.patient_id = 2;
    formValues.patient_name = "nik";
    formValues.type = "mri";
    formValues.basetype = "diagnostics"


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('prescription', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createDiagnostics("admin", formData)
    console.log(abc)
}



//ultrasound create
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const formData = new FormData();

    formValues.patient_id = 2;
    formValues.patient_name = "nik";
    formValues.type = "ultrasound";
    formValues.basetype = "diagnostics"


    if (reports !== undefined) {
        for (const tp of reports) {
            formData.append('patient_reports', tp);
        }
    }
    formData.append('prescription', insurance);
    formData.append('formValues', JSON.stringify(formValues));

    const abc = await auth_service.createDiagnostics("admin", formData)
    console.log(abc)
}

