import { useState } from 'react'
import {LoginPage, RegisterPage, HomePage} from './pages/index'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CreateListing from './pages/CreateListing'
import ListingDetails from './pages/ListingDetails'
import TripList from './pages/TripList'
import WishList from './pages/WishList'
import PropertyList from './pages/PropertyList'
import ReservationList from './pages/ReservationList'
import CategoryPage from './pages/CategoryPage'
import SearchPage from './pages/SearchPage'

function App() {

  return(
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/create-listing' element={<CreateListing/>}/>
        <Route path='/properties/:listingId' element={<ListingDetails/>}/>
        <Route path='/properties/category/:category' element={<CategoryPage/>}/>
        <Route path='/properties/search/:search' element={<SearchPage/>}/>
        <Route path='/:userId/trips' element={<TripList/>}/>
        <Route path="/:userId/wishList" element={<WishList />} />
        <Route path="/:userId/properties" element={<PropertyList />} />
        <Route path="/:userId/reservations" element={<ReservationList />} />
        
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
