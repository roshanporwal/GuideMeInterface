import React from 'react';
import 'react-bootstrap';


export default function File(props) {

    return (



        <div className="col-md-12">
            <div className="form-group pt-4">
                <label>{props.label}</label>
                <input
                    style={{ borderColor: "rgb(56, 56, 121)", borderRadius: 10 }}
                    className={props.className}
                    onChange={props.onChange}
                    type={props.type}
                    name={props.name}
                    id={props.id}
                    value={props.value} />
            </div>
        </div>


    );

}