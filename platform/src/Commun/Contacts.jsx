import React from 'react'
import './Contacts.css'

const Contacts = () => {
  return (
    <div className='Contact-us'>
  <div className='Contact-element'>
    <p className='Titre-Info-Contact'>Contact :</p>
    <p className='Normal-info-contact'>Address : ouad romman B_08</p>
    <p className='Normal-info-contact'>Num : 0541228509</p>
    <p className='Normal-info-contact'>Fax :</p>
    <p className='Normal-info-contact'>E-Mail : oziany8@gmail.com</p>
</div>

<div className='Contact-element'>
    <p className='Titre-Info-Contact'>Organisation mondiale de la santé</p>
    <p className='Normal-info-contact'>
        <a href='https://www.who.int/fr/news-room/fact-sheets/detail/diabetes'>Informations sur le diabète</a>
    </p>
    <p className='Normal-info-contact'>
        <a href='https://www.who.int/fr/news-room/fact-sheets/detail/cardiovascular-diseases-(cvds)'>Informations sur les maladies cardiovasculaires</a>
    </p>
</div>

    </div>
  )
}

export default Contacts