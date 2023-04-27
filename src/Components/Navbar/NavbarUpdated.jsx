/** <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
  <Link className="navbar-brand" to="/">ShopCart</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     {userdata?     
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item active">
        <NavLink className={({isActive})=>isActive?"nav-link active":"nav-link"} to="home">Home <span className="sr-only">(current)</span></NavLink>
        </li>
        <li className="nav-item active">
        <NavLink className={({isActive})=>isActive?"nav-link active":"nav-link"} to="category">Category <span className="sr-only">(current)</span></NavLink>
        </li>
        
      </ul>:""}
     

      <ul className="navbar-nav ms-auto">
      {userdata?    <>
    <li className="nav-item active">
        <NavLink className={({isActive})=>isActive?"nav-link active":"nav-link"} to="profile">Profile <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item active">
        <NavLink className={({isActive})=>isActive?"nav-link active":"nav-link"} to="cart">
        <div  class=" position-relative">
           <i className='fa-solid fa-shopping-cart'> </i> 

  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
       {cartitems.numOfCartItems}
  </span>
</div>
           
            
            <span className="sr-only">(current)
        </span></NavLink>
      </li>
      <li className='nav-item' onClick={logout}>
        <span className='nav-link cursor'  >Logout</span>
      </li>
      </>:<>
      <li className="nav-item active">
              <NavLink className={({isActive})=>isActive?"nav-link active":"nav-link"} to="login">Login <span className="sr-only">(current)</span></NavLink>
            </li>
      <li className="nav-item active">
        <NavLink className={({isActive})=>isActive?"nav-link active":"nav-link"} to="register">Register <span className="sr-only">(current)</span></NavLink>
      </li>
</>
    }
  
    

    </ul>
    </div>
  </div>
</nav>
    </div>
  */