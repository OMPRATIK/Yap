import "dotenv/config";
import connectDB from "./db/connect.js";
import User from "./models/user.model.js";

const seedUsers = [
  {
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "olivia.miller@example.com",
    fullName: "Olivia Miller",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "sophia.davis@example.com",
    fullName: "Sophia Davis",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    email: "ava.wilson@example.com",
    fullName: "Ava Wilson",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    email: "isabella.brown@example.com",
    fullName: "Isabella Brown",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    email: "mia.johnson@example.com",
    fullName: "Mia Johnson",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    email: "charlotte.williams@example.com",
    fullName: "Charlotte Williams",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    email: "amelia.garcia@example.com",
    fullName: "Amelia Garcia",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
  },

  // Male Users
  {
    email: "james.anderson@example.com",
    fullName: "James Anderson",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "william.clark@example.com",
    fullName: "William Clark",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "benjamin.taylor@example.com",
    fullName: "Benjamin Taylor",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "lucas.moore@example.com",
    fullName: "Lucas Moore",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "henry.jackson@example.com",
    fullName: "Henry Jackson",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "alexander.martin@example.com",
    fullName: "Alexander Martin",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    email: "daniel.rodriguez@example.com",
    fullName: "Daniel Rodriguez",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    fullName: "Padraig Pobjoy",
    email: "ppobjoy0@tinypic.com",
    password: "lZ5(GMm<ednHe",
    profilePic:
      "https://robohash.org/natuseligendiperferendis.png?size=50x50&set=set1",
  },
  {
    fullName: "Simon Kinsella",
    email: "skinsella1@facebook.com",
    password: "hZ8)+K!qvV<_",
    profilePic:
      "https://robohash.org/aliquamquosdolores.png?size=50x50&set=set1",
  },
  {
    fullName: "Sheree Perrigo",
    email: "sperrigo2@live.com",
    password: "qJ9*<jT*",
    profilePic:
      "https://robohash.org/aliquamdoloreprovident.png?size=50x50&set=set1",
  },
  {
    fullName: "Charmine Keningley",
    email: "ckeningley3@pagesperso-orange.fr",
    password: "oI8|m{eDN'4.|",
    profilePic: "https://robohash.org/adictaet.png?size=50x50&set=set1",
  },
  {
    fullName: "Meghan Galpen",
    email: "mgalpen4@intel.com",
    password: "lI6*nxfpqTcX",
    profilePic:
      "https://robohash.org/porrosintvoluptatem.png?size=50x50&set=set1",
  },
  {
    fullName: "Werner McPeice",
    email: "wmcpeice5@simplemachines.org",
    password: 'fY4<B~),QS<A"',
    profilePic:
      "https://robohash.org/laboriosamoditdolorum.png?size=50x50&set=set1",
  },
  {
    fullName: "Merna Juschka",
    email: "mjuschka6@fema.gov",
    password: "fA1`0`d,#3l<",
    profilePic:
      "https://robohash.org/aliquamadipisciet.png?size=50x50&set=set1",
  },
  {
    fullName: "Marcile Machin",
    email: "mmachin7@tripadvisor.com",
    password: 'uU3,i52T"A0l3x(u',
    profilePic:
      "https://robohash.org/itaqueblanditiisut.png?size=50x50&set=set1",
  },
  {
    fullName: "Rhianna Delamar",
    email: "rdelamar8@sogou.com",
    password: "fO1'?`\\YmNTL6",
    profilePic:
      "https://robohash.org/possimusoptioperspiciatis.png?size=50x50&set=set1",
  },
  {
    fullName: "Phineas Hulmes",
    email: "phulmes9@joomla.org",
    password: "aQ8!nky8$",
    profilePic: "https://robohash.org/esthicdolore.png?size=50x50&set=set1",
  },
  {
    fullName: "Nathanial Girardey",
    email: "ngirardeya@stanford.edu",
    password: "eQ9.ZglV@",
    profilePic: "https://robohash.org/doloresdolora.png?size=50x50&set=set1",
  },
  {
    fullName: "Walliw Hunnaball",
    email: "whunnaballb@meetup.com",
    password: "uA9|DqOS",
    profilePic:
      "https://robohash.org/repudiandaeametdolor.png?size=50x50&set=set1",
  },
  {
    fullName: "Julio Nineham",
    email: "jninehamc@weibo.com",
    password: "pG4)lFV}$<Je_VZH",
    profilePic: "https://robohash.org/utodiout.png?size=50x50&set=set1",
  },
  {
    fullName: "Lynnet Penney",
    email: "lpenneyd@discovery.com",
    password: "gX8_BDTc+Gx8x#EJ",
    profilePic: "https://robohash.org/iustoimpeditsed.png?size=50x50&set=set1",
  },
  {
    fullName: "Berkie Wardle",
    email: "bwardlee@hibu.com",
    password: "kA9$R41Jb,",
    profilePic:
      "https://robohash.org/adipisciexercitationemtempora.png?size=50x50&set=set1",
  },
  {
    fullName: "Jewel Dobbins",
    email: "jdobbinsf@discuz.net",
    password: 'oY1("Rhy',
    profilePic:
      "https://robohash.org/delectussolutaadipisci.png?size=50x50&set=set1",
  },
  {
    fullName: "Edi Delieu",
    email: "edelieug@skyrock.com",
    password: "eT7}tvc$6c",
    profilePic: "https://robohash.org/estcumnesciunt.png?size=50x50&set=set1",
  },
  {
    fullName: "Judy Huntington",
    email: "jhuntingtonh@posterous.com",
    password: "pY2}$R<Zmj8jL",
    profilePic: "https://robohash.org/aetdelectus.png?size=50x50&set=set1",
  },
  {
    fullName: "Dimitry Stilling",
    email: "dstillingi@printfriendly.com",
    password: "jU9!)(?n",
    profilePic:
      "https://robohash.org/laboreveniamdistinctio.png?size=50x50&set=set1",
  },
  {
    fullName: "Erna Pargiter",
    email: "epargiterj@seesaa.net",
    password: "dP5&_Zz|B%",
    profilePic: "https://robohash.org/eosnatusenim.png?size=50x50&set=set1",
  },
];

const populate = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await User.create(seedUsers);
    console.log("Users Populated");
  } catch (err) {
    console.log(err);
  }
};

populate();
