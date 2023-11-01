import React, { useState } from 'react';

const Problem1 = () => {
    const [show, setShow] = useState('all');
    const [state, setState] = useState({})
    const [data, setData] = useState([])

    const handleClick = (val) => {
        setShow(val);
    }

    const inputHandler = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const submitHandler = e => {
        e.preventDefault()
        let statedata = [...data];

        setData([...data, state])
    }

    console.log(data);

    const activeData = data.map((item, idx) => {
        if (item.status.toLowerCase() === 'active') {
            return <tr key={idx}>
                <td scope="col">{item.name}</td>
                <td scope="col">{item.status}</td>
            </tr>
        }
    })
    const completeData = data.map((item, idx) => {
        if (item.status.toLowerCase() === 'completed') {
            return <tr key={idx}>
                <td scope="col">{item.name}</td>
                <td scope="col">{item.status}</td>
            </tr>
        }
    })
    const otherData = data.map((item, idx) => {
        if (item.status.toLowerCase() !== 'active' && item.status.toLowerCase() !== 'completed') {
            return <tr key={idx}>
                <td scope="col">{item.name}</td>
                <td scope="col">{item.status}</td>
            </tr>
        }
    })

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Name" name='name' onChange={inputHandler} />
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Status" name='status' onChange={inputHandler} />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary" onClick={submitHandler}>Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeData}
                            {completeData}
                            {otherData}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;