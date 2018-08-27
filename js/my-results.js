'use strict';


var resources = [];
//constructor function to create resource objects
function Resource(name, url, phone, address, description, shelter, food, drugAlcohol, mentalTherapy, women, men, menOverSixty, hasChildren, overEighteen) {
  this.name = name;
  this.url = url;
  this.phone = phone;
  this.address = address;
  this.description = description;

  //Booleans Below!
  this.shelter = shelter;
  this.food = food;
  this.drugAlcohol = drugAlcohol;
  this.mentalTherapy = mentalTherapy;
  this.allWomen = women;
  this.allMen = men;
  this.menOverSixty = menOverSixty;
  this.hasChildren = hasChildren;
  this.overEighteen = overEighteen;

  //Pushing into resources array
  resources.push(this);
}

//~~~~~~~~~~Resource Object Creations Live here~~~~~~~~~~//
//Shelter Resources

//Food Assistance Resources

//Drug and Alcohol Abuse Resources
new Resource('Narcotics Anonymous/Alcohol Anonymous General Phone Line', 'seattlena.org', '(206) 790-8888', false, 'Anyone in need of drug or alcohol abuse treatment information. This phone line will connect you with someone to talk to.', false, false, true, true, true, true, true, true, true);
new Resource('King County Mental Health and Substance Abuse Services','kingcounty.gov/depts/community-human-services/mental-health-substance-abuse.aspx', '(206) 263-9000', '401 5th Ave, Suite 500', 'When calling this number they will provide information on mental health and drug/alcohol abuse refferences.', false, false, true, true, true, true, true, true, true);
new Resource('Asian Counseling and Refferal Service','acrs.org/services/recovery-services/', '(206) 695-7600', '3639 Martin Luther King Jr. Way S', 'ACRS recognizes this, and provides culturally competent and linguistically accessible outreach, engagement, education, prevention, intervention, recovery support and treatment services to support holistic recovery.', false, false, true, true, true, true, true, true, true);
new Resource('Cascade Behavorial Hospital','cascadebh.com', '(877) 552-2970', '12844 Military Rd S Tukwila, WA ', 'Our behavioral health programs begin with a complete assessment in order to build an individualized plan that emphasizes personal care. For those with alcohol and drug abuse issues, we utilize both group and individual therapy sessions, focusing on the physical, psychological, and spiritual effects of addiction.', false, false, true, true, true, true, true, true, true);
new Resource('Community Psychiatric Clinic','cpcwa.org', '(206) 461-3614', 'Northway West Building, 10700 Meridian Avenue N, Suite G-11', 'Community Psychiatric Clinic provides an array of accredited outpatient mental health treatment and counseling programs to serve our clients.  These programs utilize best practices in mental health treatment and counseling to support the recovery of our clients.', false, false, true, true, true, true, true, true, true);
new Resource('After Hours Psych Line','crisisclinic.org', '(866) 427-4747', false, 'Crisis Connections, formerly known as Crisis Clinic, was founded in 1964. We are one of the oldest Crisis Lines in the nation, and home to five programs focused on serving the emotional and physical needs of individuals across Washington State. ', false, false, true, true, true, true, true, true, true);
new Resource('Washington Recovery Helpline','warecoveryhelpline.org', '(866) 789-1511', false, 'The Washington Recovery Help Line is a program of Crisis Connections. We offer an anonymous, confidential 24-hour help line for Washington State residents. Our services include crisis intervention and referral assistance related to substance use disorder, problem gambling, and mental health challenges. Professionally-trained volunteers and staff provide emotional support and connect callers with local treatment resources or additional community services. Hope is out there. Let us help.', false, false, true, true, true, true, true, true, true);
new Resource('Evergreen Treatment Services','evergreentx.org/medication-assisted-treatment/', '(206) 223-3644', '1700 Airport Way South', 'ETS uses medication to help stabilize the brain functioning of people with opioid use disorders. This treatment recognizes the effects of prolonged opioid use on the brain and helps to manage this medical condition by stabilizing brain chemistry. Once a patient is medically stabilized, they are better equipped to tackle the difficult emotional and environmental circumstances surrounding recovery. We combine medication with important rehabilitative services in our federally accredited opioid treatment program.', false, false, true, true, true, true, true, true, true);
new Resource('211','win211.org', '211', false, 'Washington 211 exists to make people’s lives better; to enhance community resiliency; to identify and break cycles of need, and to help organizations, foundations, businesses, individuals and government more efficiently distribute resources.', true, true, true, true, true, true, true, true, true);


function listAllResources() {
  for(var i = 0; i < resources.length; i++) {
    console.log(resources[i]);
  }
}

listAllResources();