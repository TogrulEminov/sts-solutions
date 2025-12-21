import EmployeeCard from "@/src/globalElements/cards/employee";
import React from "react";
const employees = [
  {
    name: "John Doe",
    position: "Software Engineer",
    phone: "+1 234 567 890",
    email: "johndoe@example.com",
    image: "https://res.cloudinary.com/da403zlyf/image/upload/v1766320803/eb40d2d55c39135c3adf2234c8c9d519d7bb961a_om0ikf.png"
  },
  {
    name: "Jane Smith",
    position: "Project Manager",
    phone: "+1 987 654 321",
    email: "janesmith@example.com",
    image: "https://res.cloudinary.com/da403zlyf/image/upload/v1766320803/eb40d2d55c39135c3adf2234c8c9d519d7bb961a_om0ikf.png"
  },
  {
    name: "Robert Brown",
    position: "Designer",
    phone: "+1 456 789 012",
    email: "robertbrown@example.com",
    image: "https://res.cloudinary.com/da403zlyf/image/upload/v1766320803/eb40d2d55c39135c3adf2234c8c9d519d7bb961a_om0ikf.png"
  },
  {
    name: "Emily Johnson",
    position: "Marketing Specialist",
    phone: "+1 321 654 987",
    email: "emilyjohnson@example.com",
    image: "https://res.cloudinary.com/da403zlyf/image/upload/v1766320803/eb40d2d55c39135c3adf2234c8c9d519d7bb961a_om0ikf.png"
  }
];

export default function TeamArea() {
  return (
    <section className="lg:py-25">
      <div className="container flex flex-col space-y-10">
        <article className="flex items-center justify-between">
          <strong className="font-manrope font-extrabold text-4xl text-ui-1">
            Komandamız
          </strong>
          <p className="lg:max-w-3xl lg:text-right text-ui-9  font-manrope font-normal lg:text-2xl">
            STS Mühəndislik” komandası 2000-ci illərin ortalarında Azərbaycanın
            sənaye sahəsində aparıcı qlobal şirkətlərlə birlikdə həyata
            keçirilən böyük layihələrdə iştirak edərək formalaşıb.
          </p>
        </article>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {employees?.map((employee, index) => (
              <EmployeeCard
                key={index}
                index={index}
                name={employee.name}
                position={employee.position}
                phone={employee.phone}
                email={employee.email}
                image={employee.image}
              />
            ))}
          </div>
      </div>
    </section>
  );
}
