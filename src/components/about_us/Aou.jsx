import React from 'react'
import "./Aou.scss"
import iqbal from './iqbal.png'
import nawa from './nawa.png'
import goldy from './goldy.png'
import chandra from './chandra.png'
import risma from './risma.png'
import danang from './danang.png'
import sponsor from './sponsor.png'
import support from './support.png'

export default function Aou() {
    return (
        <div className="c_about_us ">
            <div className="section_dt">
                <h2>Developer Team</h2>
                <span className="grid">
                    <span>
                        <img src={iqbal} alt="iqbal" srcset="" loading="lazy"/>
                        <h3>Iqbal</h3>
                    </span>
                    <span>
                        <img src={nawa} alt="iqbal" srcset="" loading="lazy"/>
                        <h3>Nawa</h3>
                    </span>
                    <span>
                        <img src={goldy} alt="iqbal" srcset="" loading="lazy"/>
                        <h3>Goldy</h3>
                    </span>
                    <span>
                        <img src={chandra} alt="iqbal" srcset="" loading="lazy"/>
                        <h3>Chandra</h3>
                    </span>
                    <span>
                        <img src={risma} alt="iqbal" srcset="" loading="lazy"/>
                        <h3>Risma</h3>
                    </span>
                    <span>
                        <img src={danang} alt="iqbal" srcset="" loading="lazy"/>
                        <h3>Danang</h3>
                    </span>
                </span>
            </div>
            <div className="section_sponsor">
                <h2>Sponsored By</h2>
                <img src={sponsor} alt="sponsor" srcset="" loading="lazy"/>
            </div>
            <div className="section_sponsor">
                <h2>Supported By</h2>
                <img src={support} alt="support" srcset="" loading="lazy"/>
            </div>
            <div className="section_people">
                <h2>Supervisors and Mentors</h2>
                <ul>
                    <li>Umi Sa'adah (Dosen Teknik Informatika PENS)</li>
                    <li>Desy Intan Permatasari (Dosen Teknik Informatika PENS)</li>
                    <li>Andhik Ampuh Yunanto (Dosen Teknik Informatika PENS)</li>
                    <li>Maulidan Bagus Afridian Rasyid (Founder Maulidan Games & Rasyid Technologies)</li>
                    <li>Willy Achmat Fauzi (CEO Sindika)</li>
                    <li>Verent Flourencia Irene (UX Designer Maulidan Games)</li>
                    <li>Mayshella Ainun Wakhidah (Mahasiswa Teknik Informatika PENS)</li>
                    <li>Andika Ahmad Ramadhan (Mahasiswa Teknik Informatika PENS)</li>
                    <li>Fandi Ahmad (Mahasiswa Teknik Informatika PENS)</li>
                    <li>Ardian Kristya Pratama (Mobile Developer AlinaMed & Ikkat Inovasi Teknologi)</li>
                    <li>Angga Pradipta Kurnia Putra (CTO AlinaMed & Mobile Developer Ikkat Inovasi Teknologi)</li>
                    <li>Muhammad Alif Pradipta ADP (Mobile Developer Sindika)</li>
                    <li>Rafly Arief Kanza (Owner & Full Stack Developer punggawastudio.com)</li>
                    <li>Ahmad Jarir At Thobari (Software Engineer Rasyid Technologies)</li>
                    <li>Ajie Dibyo Respati (Mahasiswa Teknik Informatika PENS)</li>
                    <li>Achmad Zulkarnain (CEO & Co-Founder TrustMedis)</li>
                    <li>Arie Affianto (Founder Profilku Mobile & Samsung Developer Warrior)</li>
                    <li>Tegar Imansyah ( Software RnD in System Architect Alterra)</li>
                </ul>
            </div>
        </div>
    )
}
