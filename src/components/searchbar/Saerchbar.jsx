import React, { Component } from 'react'; 
import { ImSearch } from 'react-icons/im';
import styles from './Searchbar.module.css';

export default class Searchbar extends Component {
    state ={
        images: '',
    };
    
    handleSearch = evt => {
        this.setState({images:evt.currentTarget.value.toLowerCase()});
    };

    handleSubmit = evt=>{
        evt.preventDefault();
        if(this.state.images.trim()===''){
            alert('Введите запрос');
            return;
        }
        this.props.onSubmit(this.state.images);
        this.setState({images:''});
    };

    render(){
        return (
            <header className={styles.searchbar}>
                <form onSubmit={this.handleSubmit} className={styles.searchForm}>
                    <button type="submit" className={styles.searchForm_button}>
                        <ImSearch style={{ marginRight: 5, width: 35 }} />
                        <span className={styles.searchForm_buttonLabel }>Search</span>
                    </button>

                    <input
                    className={styles.searchForm_input}
                    type="text"
                    value={this.state.images}
                    placeholder="Search images and photos"
                    onChange={this.handleSearch}
                    />
                </form>
            </header>
        );
    }
}
