import React from "react";
import { FaUserTie, FaUsers, FaLightbulb } from "react-icons/fa";

const team = [
  {
    name: "Mohammed ElHabib Abaakil",
    role: "CEO",
    img: "/ceo-placeholder.png",
  },
  {
    name: "Amina Benali",
    role: "Directrice Technique",
    img: "/team-placeholder.png",
  },
  {
    name: "Youssef El Idrissi",
    role: "Responsable Projets",
    img: "/team-placeholder.png",
  },
];

export default function AboutSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 to-green-50" id="about">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">À propos de Pprime</h2>
        <div className="mb-10 text-center text-lg text-gray-700 max-w-3xl mx-auto">
          <p>
            Pprime œuvre dans le domaine des installations électriques pour l'agriculture, l'industrie et le tertiaire. Notre mission : accompagner la transition énergétique et garantir la performance de nos clients.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center mb-12">
          <div className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FaLightbulb className="text-3xl text-yellow-400 mb-2" />
            <h3 className="font-semibold text-blue-800 mb-1">Innovation</h3>
            <p className="text-gray-600 text-center">Nous intégrons les dernières technologies pour des solutions durables et performantes.</p>
          </div>
          <div className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FaUsers className="text-3xl text-green-600 mb-2" />
            <h3 className="font-semibold text-blue-800 mb-1">Engagement</h3>
            <p className="text-gray-600 text-center">Proximité, écoute et accompagnement sur-mesure pour chaque client.</p>
          </div>
          <div className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <FaUserTie className="text-3xl text-blue-700 mb-2" />
            <h3 className="font-semibold text-blue-800 mb-1">Expertise</h3>
            <p className="text-gray-600 text-center">Une équipe expérimentée, passionnée par l'excellence technique et la sécurité.</p>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">Équipe dirigeante</h3>
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col items-center w-60">
              <img src={member.img} alt={member.name} className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-blue-100" />
              <div className="font-semibold text-blue-800">{member.name}</div>
              <div className="text-sm text-gray-600">{member.role}</div>
            </div>
          ))}
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="border-l-4 border-blue-300 pl-6 text-gray-700 text-base">
            <div className="mb-2 font-semibold text-blue-800">Notre histoire</div>
            <ul className="space-y-2">
              <li><span className="font-bold">2010</span> : Création de Pprime, premiers projets industriels</li>
              <li><span className="font-bold">2015</span> : Développement du pôle Green Tech et tertiaire</li>
              <li><span className="font-bold">2022</span> : Références majeures et croissance nationale</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
} 