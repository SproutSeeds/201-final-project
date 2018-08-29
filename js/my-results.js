'use strict';

// Declare global variables
var welcomeEl = document.getElementById('welcome');
var resourceList = document.getElementById('results');


//Declare icon variables 

var shelterIcon = '<i class="fas fa-home" title="Shelter" alt="shelter icon"></i>';
var foodIcon = '<i class="fas fa-utensils" title="Food" alt="food icon"></i>';
var drugAlcoholIcon = '<i class="fas fa-prescription-bottle-alt" title="Drug and Alcohol Treatment" alt="drug and alcohol treatment icon"></i>';
var mentalTherapyIcon = '<i class="fas fa-brain" title="Mental Health Therapy" alt="mental health therapy icon"></i>';
var allWomenIcon = '<i class="fas fa-venus" title="Serves Women" alt="serves women icon"></i>';
var allMenIcon = '<i class="fas fa-mars" title="Serves Men" alt="serves women icon"></i>';
var hasChildrenIcon = '<i class="fas fa-child" title="Allows Children" alt="allows children icon"></i>';


//Empty array to hold all resource objects
var resources = [];

//Empty array to hold all resource objects that match the user's specifications
var userResources = [];


//Render Welcome Message
function renderWelcome() {
  var name = JSON.parse(localStorage.getItem('username'));
  var h2El = document.createElement('h2');

  if(name === null){
    h2El.textContent = 'Welcome';
    welcomeEl.appendChild(h2El);
  } else {
    h2El.textContent = (`Welcome, ${name}`);
    welcomeEl.appendChild(h2El);
  }
}

//Pull down user object from localstorage
var userProfile = JSON.parse(localStorage.getItem('locallyStoredUser'));

//Transform user object values to boolean to match resource values
var userAllWomen = false;
if(userProfile.gender === 'female' || userProfile.gender === 'other' || userProfile.gender === 'not-say') {
  userAllWomen = true;
}
var userAllMen = false;
if(userProfile.gender === 'male' || userProfile.gender === 'other' || userProfile.gender === 'not-say') {
  userAllMen = true;
}
var userMenOverSixty = false;
if((userProfile.gender === 'male' || userProfile.gender === 'other' || userProfile.gender === 'not-say') && userProfile.age === '59-and-over') {
  userMenOverSixty = true;
}

var userHasChildren = userProfile.children;
var userOverEighteen = false;
if(userProfile.age === 'under-18'){
  userOverEighteen = true;
}

var userShelter = userProfile.shelter;
var userDrugAlcohol = userProfile.drugAlcohol;
var userMentalTherapy = userProfile.mentalTherapy;
var userFood = userProfile.food;


//Populate array of resources for user

function compareUserResources () {
  for (var i = 0; i < resources.length; i++){
    console.log('in the for loop');
    if (userShelter === true && resources[i].shelter === true) {
      if ((userAllWomen === resources[i].allWomen && userHasChildren === resources[i].hasChildren) || (userAllWomen === resources[i].allWomen && (userHasChildren === false && resources[i].hasChildren === true))){
        userResources.push(resources[i]);
      } else if (userAllMen === resources[i].allMen){
        userResources.push(resources[i]);
      } else if (userMenOverSixty === resources[i].menOverSixty) {
        userResources.push(resources[i]);
      } else if (userOverEighteen === resources[i].overEighteen){
        userResources.push(resources[i]);
      }
    }
    if (userDrugAlcohol === true && resources[i].drugAlcohol === true) {
      userResources.push(resources[i]);
    }
    if (userMentalTherapy === true && resources[i].mentalTherapy === true) {
      userResources.push(resources[i]);
    }
    if (userFood === true && resources[i].food === true) {
      userResources.push(resources[i]);
    }
  }
}

//Removing duplicates from array of user resources
function removeUserResourcesDupes(){
  for (var i = 0; i < userResources.length; i++){
    for (var j = i + 1; j < userResources.length; j++) {
      if(userResources[i].name === userResources[j].name){
        console.log('before splice');
        userResources.splice(j, 1);
        j--;
      }
    }
  }
}

//Render list of resources on page

function renderResourceList() {
  for (var i = 0; i < userResources.length; i++){
    var resourceName = userResources[i].name;
    var expansionIcon = `<i class="fas fa-plus expansion-icon" alt="more information icon" title="${resourceName}"></i>`;
    var liEl = document.createElement('li');
    if (userResources[i].address === false){
      userResources[i].address = 'Not Available';
    }
    if (userResources[i].phone === false) {
      userResources[i].phone = 'Not Available';
    }
    liEl.innerHTML = `${userResources[i].name} | https://www.${userResources[i].url} <div id="expansion-icon-container" title="${resourceName}">${expansionIcon}</div> <br>Phone: ${userResources[i].phone} | Address: ${userResources[i].address}<br><div class="description hidden" id="description-${i}">${userResources[i].description}</div>`;

    var iconEl = document.createElement('li');

    for(var j = 0; j < userResources[i].icons.length; j++) {
      iconEl.innerHTML += userResources[i].icons[j];
    }

    liEl.appendChild(iconEl);

    resourceList.appendChild(liEl);
    // document.getElementById('expansion-icon').setAttribute('title', userResources[i].name);
  }
}



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
  this.icons = [];

  //Pushing into resources array
  resources.push(this);
}

//Identify necessary icons for each object so that it can be added to the object

Resource.prototype.setIcons = function() {
  if(this.shelter === true){
    this.icons.push(shelterIcon);
  }
  if(this.food === true) {
    this.icons.push(foodIcon);
  }
  if(this.drugAlcohol === true) {
    this.icons.push(drugAlcoholIcon);
  }
  if(this.mentalTherapy === true) {
    this.icons.push(mentalTherapyIcon);
  }
  if(this.allWomen === true) {
    this.icons.push(allWomenIcon);
  }
  if(this.allMen === true) {
    this.icons.push(allMenIcon);
  }
  if(this.hasChildren === true) {
    this.icons.push(hasChildrenIcon);
  }
};


//~~~~~~~~~~Resource Object Instances Live here~~~~~~~~~~//
//Shelter Resources

new Resource ('Bread of Life Mission Shelter', 'breadoflifemission.org', '(206) 682-3579 x100', '97 S. Main St.', 'Shelter with meals and no maximum length of stay for homeless men, 18 and older. Accepts offenders and sex offenders. Documents Required: valid photo ID. $5 per night.', true, true, false, false, false, false, true, true, false, true);

new Resource ('Catholic Housing Services Women\'s Referral Center', 'ccsww.org', '(206) 441-3210', '2030 Third Ave., Angeline\'s Center', 'Sightly emergency shelter screening and referral for women, 18 and older. No children. Visit in person. Priority given to clients who arrive by 8 p.m. No fees.', true, false, false, false, true, true, false, false, true);

new Resource ('Compass Housing Alliance Blaine Center', 'compasshousingalliance.org', '(206) 474-1000 / (206) 474-1600', '77 S. Washington St., Client Services', 'Overnight shelter with no limit to length, evening meal, breakfast,showers, limited storage, case management and referral services.Serves single men,18 and older. Visit Compass Client Services Office in person for intake. Most intake is done through case managerreferrals; self-referral space is very limited. $21 weekly.', true, true, false, false, false, true, true, false, true);

new Resource ('Community Emergency Family Shelter Intake Line', false, '(206) 245 - 1026', false, 'Intake for emergency night shelter for pregnant women and families.', true, false, false, false, true, true, true, true, true);

new Resource ('DESC', 'desc.org', '(206) 464-1570 x3033', '517 Third Ave.', 'Contact: 24 hours; intake: daily: 8 a.m. – 4:45 p.m.; shelter nightly: 4:45 p.m. – 7 a.m. Overnight emergency shelters. The main shelter offers onsite medical care, mental health counseling and substance usedisorder treatment. Serves women 18 and older, men 60 and older and anyone 18 and older who is vulnerable due to mental illness, developmental disability, substance use disorder and/or medical condition. Visit in person to register. Only professional referrals accepted after 5 p.m. Documents Required: documentation of disability or vulnerability may be required. No fees.', true, false, true, true, true, true, true, false, true);

new Resource ('King County Administration Building', 'resourcetalk.crisisclinic.org', '(206) 263-9089', '420 and 500 Fourth Ave.', 'Intake: 7 p.m.; nightly, 7 p.m. – 6 a.m. Shelter beds serving men, 18 and older. Serves trans* clients identifying as male; notify staff of accommodations needed. Serves men fleeing DV, but location is not confidential. Service animals and pets are allowed. Visit in person. Intake for both locations at the King County Administration Building at 4th & Jefferson. Line forms in front of the garage door. No fees.', true, false, false, false, false, true, true, false, true);

new Resource ('Operation Nightwatch', 'seattlenightwatch.org/get-help/nightwatch-shelter', 'Men\'s Tickets DESC: (206) 464-1570, Men\'s Tickets Bread of Life Mission: (206) 682-3579', 'DESC: 517 Third Ave. / Bread of Life Mission: (206) 682-3579', 'In-person intake: 9 p.m. – 12 a.m. nightly. Late-night referrals and transportation to downtown Seattle shelters. Wheelchair accessible. Serves single men and women, 18 and older. Men must either first obtain a referral ticket from one of the shelters listed, or provide an Operation Nightwatch ticket from the previous night. Women can visit site without a referral ticket. Referral tickets and admission to the Operation Nightwatch Dispatch center do not guarantee placement into a shelter. No fees.', true, false, false, false, true, true, true, false, true);

new Resource ('Salvation Army', 'salvationarmynw.org', '(206) 447-9944', '1101 Pike St.', 'Enhanced dormitory-style emergency shelter and case management for single homeless women, 18 and older. Facility is clean and sober. Performs background checks. Serves any client who self-identifies as female. Call to inquire about space availability and to do a phone screening. Program fees are $5 per day. Inability to pay does not negate entry.', true, false, false, false, true, false, false, false, true);

new Resource ('Seattle Union Gospel Mission Men\'s Shelter', 'ugm.org', '(206) 622-5177', '318 Second Ave. Extension S', 'Phone inquiries and tickets: daily: 9:30 – 11:30 a.m., 12:30 – 5:30 p.m., 10 p.m. – 6 a.m.; in-person intake with tickets: 8 p.m. nightly. Operates an emergency shelter. Serves homeless men 18 and older. Accepts offenders. Chapel service attendance is required for some services. Call to check space availability and to reserve a ticket for the night. Clients without a ticket should line up for unclaimed mats beginning at 7:15 p.m. Documents Required: ID. No fees.', true, false, false, false, false, true, true, false, true);

new Resource ('Seattle Union Gospel Mission Women\'s Shelters', 'ugm.org/what-we-do/welcome-and-embrace/', '(206) 628-2008', '3802 Othello St.', 'Intake: Mon. – Fri., 8:30 – 9 a.m. Structured shelter serving single women and women with children who are in recovery from drugs or alcohol or who have experienced domestic violence but are not actively being pursued. Transgender clients served on a case-by-case basis. Cannot serve sex offenders. Wheelchair accessible. Performs background checks Cannot accept women who are currently on a Methadone program. Call for telephone screening. Call daily to check and maintain spot on wait-list. Payment plan can be arranged.', true, false, false, false, true, false, false, true, false);

new Resource ('SHARE/WHEEL', 'sharewheel.org/need-shelter', false, '1902 Second Ave.', 'Mon., Thurs., 1 p.m.; Tue., Wed., Fri., Sat., 6 p.m. Self-managed overnight shelter. Intake is usually available in Spanish as well as English. Screenings for night-of only. Serves adults experiencing homelessness, 18 and older. Apply in person. No fees.', true, false, false, false, true, true, true, false, true);

new Resource ('WHEEL', 'sharewheel.org/Home/wheel', '(206) 956-0334', 'Trinity Episcopal Parish, 609 Eighth Ave.', 'Shelter: daily, 8 p.m. – 6:30 a.m. Shelter serving homeless women, 18 and older. Service animals allowed, no pets. Visit in person. No fees.', true, false, false, false, true, false, false, false, true);

new Resource ('YWCA Angeline\'s Center', 'ywcaowrks.org/programs/angelines-day-center', 'Angeline\'s Center: (206) 436-8650, Enhanced Shelter: (206) 436-8656, Winter Shelter: (206) 770-0156', '2030 Third Ave. YWCA Opportunity Place', 'Daily: 8 a.m. – 6 p.m.; orientation: Tue., 1:30 p.m. Winter shelter and an enhanced shelter. Serves homeless adult women. Serves anyone who identifies as female. Service animals accepted. Visit winter shelter in person; no fees. For enhanced shelter attend 20-minute orientation and apply; performs background checks; fee of 30 percent of income.', true, false, false, false, true, false, false, false, true);
//Food Assistance Resources
new Resource ('Ballard Food Bank', 'ballardfoodbank.org/food-bank-1', '(206) 789-7800', '5130 Leary Ave. NW', 'Mon., Thurs., 2 p.m. – 7 p.m.; Tue., Wed., 11 a.m. – 4 p.m. Food pantry, commodities and home delivery for residents in 98107, 98109, 98117, 98119 and 98199. Numbers distributed 2.5 hours before opening time. Visit in person or call for delivery requirements. Application form required. Documents required: photo ID and proof of address or residency in area. No fees.', false, true, false, false, true, true, true, true, false);

new Resource ('Bethany Community Church', 'churchbcc.org/missions/local-outreach', '(206) 524-9000', '1147 N. 81st St.', 'Food Pantry: Mon., 6 – 7 p.m.; Community meals: Every second and last Mon. of the month, 6 – 8 p.m. Offers a food pantry and hot meals. Serves everyone. Visit in person. No fees.', false, true, false, false, true, true, true, true, true);

new Resource ('Blessed Sacrament Church', 'blessed-sacrament.org', '(206) 930-6005', '5050 Eighth Ave. NE', 'Sun. meal: noon – 2 p.m.; Food pantry: Fri., 10:30 a.m. – noon. Weekly meal, food pantry and food delivery for any resident of the nearby area or people who are homeless. Visit in person or call for delivery requirements. Documents required for food bank only: ID and proof of address. No fees.', false, true, false, false, true, true, true, true, false);

new Resource ('Bread of Life Mission Food', 'breadoflifemission.org', '(206) 682-3579', '97 S. Main St.', 'Lunch: Mon. – Fri., 12:15 p.m.; Dinner: Mon. – Sat., 7:15 p.m. Snacks and hot meals. Wheelchair accessible. Serves everyone. Visit in person. No fees.', false, true, false, false, true, true, true, true, false);

new Resource ('Byrd Barr Place', 'byrdbarrplace.org', '(206) 812-4970', '722 18th Ave.', 'Numbers: 8 a.m. on food pantry days; Food Pantry: Tue., 11 a.m. – 4 p.m.; Wed., noon – 4 p.m.; Thurs., 9 a.m. – 1 p.m.; Home Delivery: Thurs., 10 a.m. – 3 p.m. Food pantry and commodities serving residents of Seattle and people who are homeless. Commodities and home delivery available only to residents of ZIP codes 98102, 98112 and 98122. May visit once per week. Visit in person. Numbers are needed to reserve a space in line. Call for information about home delivery. Documents required: photo ID and proof of current address. No fees.', false, true, false, false, true, true, true, true, false);

new Resource ('Community Lunch on Capitol Hill', 'communitylunch.org', '(206) 972-2524', 'Lunch: 1710 11th Ave., Dinner: 500 Broadway E', 'Lunch: Tue., Fri., noon – 1 p.m. Dinner: Wed., Thurs., 5-6 p.m. Serves hot lunch and dinner. Serves everyone. Visit in person. No fees.', false, true, false, false, true, true, true, true, false);

new Resource ('El Centro de la Raza', 'elcentrodelaraza.org','(206) 957-4634 / (206) 973-4401', '2524 16th Ave. S','Wed., 3:30 p.m. – 6:30 p.m.; Thurs., 9 a.m. – noon, 1:30 p.m. – 4 p.m.; Fri., 2 p.m. – 4 p.m. Government Commodities: Fri., 10 a.m. – noon. Operates a food pantry. Serves everyone. Government Commodities available to residents of ZIP codes 98144 and 98108 only. May visit once per week. Visit in person. No fees.', false, true, false, false, true, true, true, true, false);

new Resource ('Emerald City Community Seventh Day Adventist Church', 'eccsda.org/article/2/about', '(206) 322-0717', '801 25th Ave.', 'Sat., 7 – 9 a.m. Serves breakfast. Focuses on Central Seattle area residents. Visit in person. No fees.', false, true, false, false, true, true, true, true, false);

new Resource ('Family Works', 'familyworksseattle.org', '(206) 694-6727', '1501 N. 45th St. / 9501 Greenwood Ave. N', 'Offers a food bank. Wallingford location serves ZIP codes 98103, 98107, 98115 and 98133 (Seattle only). Commodities are available to ZIP codes 98103 or 98107 only. Food Bank: Tue., noon – 2 p.m.; Thurs., 3 – 6 p.m.; Fri., 11 a.m. – 1 p.m.; Commodities only: Third Sat., 10 a.m. - noon. Greenwood location serves 98103, 98115, 98107, 98133, 98117 and 98177. General Public: Wed., noon – 2 p.m.; Seniors: 11 a.m. – 2 p.m. Visit in person. May visit once per week. Documents Required: photo ID and current proof of address. No fees.', false, true, false, false, true, true, true, true, false);

new Resource ('First Covenant Church', 'firstcovenantseattle.org/outreach', '(206) 322-7411', '400 E. Pike St.', 'Sat., 9 a.m. – 10 a.m. Serves breakfast. Serves everyone. Visit in person. No fees.', false, true, false, false, true, true, true, true, false);

new Resource ('First United Methodist Church of Seattle', 'firstchurchseattle.org/shared-breakfast/', '(206) 622-7278', 'Fellowship Hall, 180 Denny Way', 'Breakfast: Sun., 7:45 – 8:45 a.m. Community breakfast served at tables serving everyone. Visit in person. No fees.', false, true, false, false, true, true, true, true, false);

new Resource ('Food Not Bombs', 'foodnotbombs.net/washington.html', '(425) 243-4069', 'Dinner: Occidental Ave. S, Market: 309 Pontius Ave. N', 'Hot meals and a market with free produce and deli foods serving everyone. Visit in person. No fees. Dinner: Nov – Mar: Sun., 4 – 4:30 p.m.; Apr – Oct: Sun., 5 – 5:30 p.m. Market: Sun., 1:30 p.m.', false, true, false, false, true, true, true, true, false);

new Resource ('Immanuel Community Services', 'icsseattle.org/our-programs', '(206) 622-1930', '1215 Thomas St.', 'Food Pantry: Mon., 11 a.m. – 1 p.m.; Community Lunch: Last Sun. each month: Sept – May, noon.; Jun – Aug: 11 a.m. Meals and a food pantry serving everyone. Visit in person. No fees.', false, true, false, false, true, true, true, true, false);

new Resource ('Jewish Family Service', 'jfsseattle.org/services/emergency-services', '(206) 461-3240', '1601 16th Ave.', 'Wed., Fri., 10 a.m. – noon.; Thurs., 2 – 4 p.m. Operates a food pantry and limited home delivery. May visit once per month. Serves those who are homeless or living in zip codes 98101, 98102, 98102, 98104, 98112, 98121 and 98122 as well as all Jewish people. Visit in person. Call to inquire about home delivery or evening and Kosher food bank services. Documents Required: ID with current address. No fees.', false, true, false, false, true, true, true, true, false);

new Resource ('Lifelong', 'lifelong.org/csb-welcome-home/', '(206) 957-1686', false, 'Mon. – Fri., 8:30 a.m. – 5 p.m. Delivers meals to those living in South King County and coming home from a hospital, nursing home or other inpatient facility. No income requirements. Call for more information and to verify service area. No fees.', false, true, false, false, true, true, true, true, false);

new Resource ('Mary\'s Place', 'marysplaceseattle.org/how-we-help', '(206) 621-8474', '1830 Ninth Ave.', 'Breakfast: Sat., 9 a.m.; Lunch: Sat., noon. Provides breakfast and lunch to women. Visit in person. No fees.', false, true, false, false, true, false, false, false, false);

new Resource ('Millionair Club Charity', 'millionairclub.org/how-we-help', '(206) 728-5627', '2515 Western Ave.', 'Breakfast: Mon. – Fri., 6:15 – 7 a.m.; Lunch: Mon. – Fri., noon – 1:30 p.m. Breakfast and lunch. Visit in person. No fees.', false, true, false, false, true, true, true, true, false);

new Resource ('North Helpline', 'northhelpline.org/get-help/food-bank/', '(206) 367-3477', '12736 33rd Ave. NE / 13000 Linden Ave. N', 'Food pantry, including commodities for those living in ZIP codes 98115, 98125, 98133, 98155, 98177, 98011 and 98028 and anyone experiencing homelessness. May visit once per week. Homeless clients can receive one no cook bag per day. Visit in person. Documents Required: photo ID and proof of address. No fees.', false, true, false, false, true, true, true, true, false);

new Resource ('Northwest Harvest', 'northwestharvest.org', '(206) 625-0755', '711 Cherry St.', 'Mon., Wed., 9 a.m. – 5:30 p.m.; Fri., 9 a.m. – 5 p.m. Food bank with groceries and sack lunches. May come once per day. Serves everyone. Visit in person. No fees.', false, true, false, false, true, true, true, true, false);

new Resource ('Paradise of Praise', 'paradiseofpraise.org', '(206) 768-2745', '1316 SW Holden St', 'Tue., 10 a.m. – noon. Operates a food pantry. Serves everyone. Visit in person. No fees.', false, true, false, false, true, true, true, true, false);

new Resource ('Phinney Neighborhood Association', 'phinneycenter.org', '(206) 783-2244', '525 N. 85th St. / 5515 Phinney Ave. N', 'Serves hot meals. Visit in person. No fees. 85th St.: Dinner: Mon., 4 – 6 p.m. Phinney Ave.: Dinner: Tue: 4 – 6 p.m.; Lunch: Wed., 11 a.m. – 1 p.m.', false, true, false, false, true, true, true, true, false);

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


//Call functions
renderWelcome();
for(var i =0; i < resources.length; i++){
  resources[i].setIcons();
}

compareUserResources();
removeUserResourcesDupes();
renderResourceList();

//Show resource description event
var expansionEl = document.getElementsByClassName('expansion-icon');
console.log(expansionEl);
for(var j = 0; j < expansionEl.length; j++){
  expansionEl[j].addEventListener('click', handleExpansionEvent);
}
// console.log(expansionEl);

function handleExpansionEvent(event) {
  console.log(event.target.title);
  for(var i = 0; i < userResources.length; i++){
    if(event.target.title === userResources[i].name){
      expansionEl[i].classList.add('hidden');
      console.log(expansionEl);
      document.getElementById(`description-${i}`).classList.remove('hidden');
    }
  }
}



