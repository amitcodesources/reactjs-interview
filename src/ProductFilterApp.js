import React, { Component } from 'react'
import productdata from './product_revenue.json'

export default class Task2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: productdata,
            total:productdata.reduce((total, m) => total + m.total_revenue, 0)
        }
    }
    handleSearch = (e) => {
        e.preventDefault();

        let searchInput = e.target.value;
        if(searchInput) {        
            let newlist = productdata.filter((p) => p.product_name.includes(searchInput)).map(({id, product_name, total_revenue}) => ({id, product_name, total_revenue}));
            this.setState({ productList: newlist})
            this.setState({ total : newlist.reduce((total, m) => total + m.total_revenue, 0)});
        } else {
            this.setState({ productList: productdata });
            this.setState({ total : productdata.reduce((total, m) => total + m.total_revenue, 0)});
        }
        
    }
    render() {
        let { productList, total} = this.state;
        return (
            <div className='container mt-5'>
                <span className='d-inline-flex'>Search by Product Name: 
                        <input type="text" className='form-control' onInput={this.handleSearch}/></span>
                <table className="table table-sm table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        { productList.map((item)=> 
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.product_name}</td>
                            <td>&#8377; {Math.round(item.total_revenue)}</td>
                        </tr>
                        )}
                    </tbody>
                    <tfoot>
                    <tr>
                            <td className='fw-bold' colSpan={2}>Total Revenue</td>
                            <td className='fw-bold'>&#8377; {Math.round(total)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}
