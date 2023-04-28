import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
const Search = ({history}) => {
    const [keyword,setKeyword] = useState('');
    const navigate = useNavigate();
  const searchHanlder = (e) => { 
    e.preventDefault();
    if(keyword.trim())
    {
        navigate(`/search/${keyword}`);
    }else{
        navigate(`/`);

    }

  }
  return (
    <form onSubmit={searchHanlder}>
       
    <div className="input-group">
      <input
        type="text"
        id="search_field"
        className="form-control"
        placeholder="Enter Product Name ..."
        onChange={(e)=> setKeyword(e.target.value)}
      />
      <div className="input-group-append">
        <button id="search_btn" className="btn">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  
    </form>
  
  )
}

export default Search