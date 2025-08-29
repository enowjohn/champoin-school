import React, { useState, useEffect } from 'react';
import { 
  User, 
  Users, 
  Trophy, 
  BarChart3, 
  Calendar, 
  BookOpen, 
  Settings, 
  Globe, 
  MessageSquare, 
  Download,
  School,
  Clock,
  Award,
  TrendingUp,
  FileText,
  Camera,
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  Plus,
  Search,
  Filter,
  Eye,
  Edit3,
  Save,
  ExternalLink
} from 'lucide-react';

const SchoolWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [language, setLanguage] = useState('en');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [generatedLink, setGeneratedLink] = useState('');
  
  // Sample data
  const [students, setStudents] = useState([]);

  const [announcements, setAnnouncements] = useState([
    "GCE Mock Exams start March 15th, 2025",
    "Parent-Teacher Meeting scheduled for March 8th",
    "New library books available for checkout",
    "Science Fair registration now open"
  ]);

  const [feedback, setFeedback] = useState([]);
  const [newStudent, setNewStudent] = useState({ 
    name: '', 
    class: '', 
    subjects: { Math: '', Physics: '', Chemistry: '', English: '', Biology: '', History: '', Economics: '', Geography: '', Geology: '', Literature: '', Logic: '', Religion: '', French: '', ICT: '', Commerce: '', Art: '', Music: '', Drama: '', Physical : '', Computer: '', Accounting: '', Business: '', BusinessMaths: '', BusinessStudies: '', OfficePractice: '', } 
  });

  const translations = {
    en: {
      home: 'Home',
      teacherDashboard: 'Teacher Dashboard',
      timetable: 'Timetable',
      topPerformers: 'Top Performers',
      performance: 'Performance',
      gceResults: 'GCE Results',
      virtualTour: 'Virtual Tour',
      studyResources: 'Study Resources',
      calendar: 'Academic Calendar',
      feedback: 'Feedback',
      welcome: 'Welcome to Champion Bilingual Comprehensive High School Makenene',
      motto: 'Excellence in Education, Character in Leadership',
      aboutUs: 'About Us',
      contactUs: 'Contact Us'
    },
    fr: {
      home: 'Accueil',
      teacherDashboard: 'Tableau de Bord Enseignant',
      timetable: 'Emploi du Temps',
      topPerformers: 'Meilleurs Élèves',
      performance: 'Performance',
      gceResults: 'Résultats GCE',
      virtualTour: 'Visite Virtuelle',
      studyResources: 'Ressources d\'Étude',
      calendar: 'Calendrier Académique',
      feedback: 'Commentaires',
      welcome: 'Bienvenue au Lycée Bilingue Polyvalent Champion Makenene',
      motto: 'Excellence dans l\'Éducation, Caractère dans le Leadership',
      aboutUs: 'À Propos',
      contactUs: 'Nous Contacter'
    }
  };

  const t = translations[language];

  const campusImages = [
    { url: './public/images/building1.jpeg', caption: 'Main School Building' },
    { url: './public/images/lap1.jpeg', caption: 'Science Laboratory' },
    { url: './public/images/liabrary.jpeg', caption: 'Library and Study Hall' },
    { url: './public/images/sport.jpeg', caption: 'Sports Complex' },
    { url: './public/images/lap2.jpeg', caption: 'Computer Lab' },
    { url: './public/images/plaque.jpeg', caption: 'School Chapel' },
    { url: './public/images/staffroom.jpeg', caption: 'Administration Block' },
    { url: './public/images/students.jpeg', caption: 'Student Hostels' }
  ];
  

  const timetableData = {
    'Form 5A': {
      Monday: ['Math', 'Physics', 'Chemistry', 'English', 'French'],
      Tuesday: ['Biology', 'Math', 'Physics', 'History', 'Geography'],
      Wednesday: ['Chemistry', 'English', 'Math', 'Biology', 'French'],
      Thursday: ['Physics', 'Geography', 'History', 'Math', 'Chemistry'],
      Friday: ['English', 'French', 'Biology', 'Physics', 'Math']
    }
  };

  const academicEvents = [
    { date: '2025-03-08', title: 'Parent-Teacher Meeting', type: 'meeting' },
    { date: '2025-03-15', title: 'Mock Exams Begin', type: 'exam' },
    { date: '2025-04-12', title: 'Science Fair', type: 'event' },
    { date: '2025-05-20', title: 'GCE Examinations', type: 'exam' },
    { date: '2025-06-15', title: 'Cultural Day Celebration', type: 'event' },
    { date: '2025-07-10', title: 'Sports Competition', type: 'sports' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % campusImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const calculateAverage = (subjects) => {
    const values = Object.values(subjects).filter(val => val !== '' && !isNaN(val));
    if (values.length === 0) return 0;
    return (values.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / values.length).toFixed(1);
  };

  const getTopPerformers = () => {
    if (students.length === 0) return [];
    return students
      .map(student => ({
        ...student,
        average: parseFloat(calculateAverage(student.subjects))
      }))
      .sort((a, b) => b.average - a.average)
      .slice(0, 3);
  };

  const addStudent = () => {
    if (newStudent.name && newStudent.class) {
      const studentData = {
        ...newStudent,
        id: students.length + 1,
        photo: '/api/placeholder/80/80',
        sequence: 1,
        dateAdded: new Date().toISOString()
      };
      
      setStudents([...students, studentData]);
      
      // Generate shareable link
      const encodedData = btoa(JSON.stringify(studentData));
      const link = `${window.location.origin}${window.location.pathname}?student=${encodedData}`;
      setGeneratedLink(link);
      
      setNewStudent({ 
        name: '', 
        class: '', 
        subjects: { Math: '', Physics: '', Chemistry: '', English: '', Biology: '', French: '', Economics: '', Commerce: '', History: '', Literature: '', Geography: '', Logic: '', Religion: '' } 
      });
    }
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    alert('Link copied to clipboard!');
  };

  const openLink = () => {
    window.open(generatedLink, '_blank');
  };

  const Navigation = () => (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <School className="h-8 w-8" />
            <span className="font-bold text-lg">CBCHS Makenene / COLPOBIC</span>
          </div>
          
          <div className="hidden md:flex space-x-6">
            {[
              { id: 'home', icon: User, label: t.home },
              { id: 'teacher', icon: Users, label: t.teacherDashboard },
              { id: 'timetable', icon: Clock, label: t.timetable },
              { id: 'performers', icon: Trophy, label: t.topPerformers },
              { id: 'performance', icon: BarChart3, label: t.performance },
              { id: 'resources', icon: BookOpen, label: t.studyResources },
              { id: 'calendar', icon: Calendar, label: t.calendar }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded transition-colors ${
                  activeSection === item.id ? 'bg-blue-700' : 'hover:bg-blue-800'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-blue-800"
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'en' ? 'FR' : 'EN'}</span>
            </button>
            
            {isAdminMode && (
              <div className="flex items-center space-x-1 bg-green-600 px-2 py-1 rounded text-xs">
                <Settings className="h-3 w-3" />
                <span>Admin</span>
              </div>
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const AnnouncementBanner = () => (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Award className="h-5 w-5 text-yellow-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700 font-medium">
            {announcements[currentSlide % announcements.length]}
          </p>
        </div>
      </div>
    </div>
  );

  const HomeSection = () => (
    <div className="space-y-8">
      <AnnouncementBanner />
      
      {/* Hero Section */}
      <div className="relative h-96 rounded-lg overflow-hidden">
        <img
          src={campusImages[currentSlide].url}
          alt={campusImages[currentSlide].caption}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{t.welcome}</h1>
            <p className="text-xl md:text-2xl">{t.motto}</p>
          </div>
        </div>
        
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + campusImages.length) % campusImages.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % campusImages.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {campusImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>

    {/* School Gallery */}
<div className="bg-white p-6 rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold mb-6 flex items-center">
    <Camera className="h-6 w-6 mr-2 text-blue-600" />
    School Gallery
  </h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {campusImages.map((image, index) => (
      <div key={index} className="group cursor-pointer">
        <img
          src={image.url}
          alt={image.caption}
          className="w-full h-32 object-cover rounded-lg transition-transform group-hover:scale-105"
        />
        <div className="mt-2 text-center">
          <p className="text-sm font-medium text-black">
            {image.caption}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-6 rounded-lg text-center">
          <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-blue-600">1,200+</h3>
          <p className="text-gray-600">Students</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg text-center">
          <User className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-green-600">85+</h3>
          <p className="text-gray-600">Teachers</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg text-center">
          <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-purple-600">95%</h3>
          <p className="text-gray-600">GCE Pass Rate</p>
        </div>
        <div className="bg-orange-100 p-6 rounded-lg text-center">
          <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-orange-600">25</h3>
          <p className="text-gray-600">Years Excellence</p>
        </div>
      </div>

      {/* School News & Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FileText className="h-6 w-6 mr-2 text-green-600" />
            Latest News
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-green-700">Science Fair Winners Announced</h4>
              <p className="text-sm text-gray-600">March 1, 2025</p>
              <p className="text-gray-700 mt-1">Congratulations to all participants in our annual science fair...</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-blue-700">New Computer Lab Inaugurated</h4>
              <p className="text-sm text-gray-600">February 28, 2025</p>
              <p className="text-gray-700 mt-1">Our state-of-the-art computer lab is now open for students...</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-purple-700">Outstanding GCE Results</h4>
              <p className="text-sm text-gray-600">February 25, 2025</p>
              <p className="text-gray-700 mt-1">We are proud to announce exceptional performance in 2024 GCE...</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-red-600" />
            Upcoming Events
          </h2>
          <div className="space-y-4">
            {academicEvents.slice(0, 4).map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    event.type === 'exam' ? 'bg-red-500' : 
                    event.type === 'meeting' ? 'bg-blue-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* School Facilities Showcase */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <School className="h-6 w-6 mr-2 text-indigo-600" />
          Our Facilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Modern Classrooms',
              description: '40 well-equipped classrooms with smart boards and modern furniture',
              image: '/public/images/class.jpeg',
              icon: BookOpen
            },
            {
              title: 'Science Laboratories',
              description: 'Fully equipped Physics, Chemistry, and Biology laboratories',
              image: '/public/images/lap2.jpeg',
              icon: Award
            },
            {
              title: 'Digital Library',
              description: 'Over 10,000 books plus digital resources and study spaces',
              image: '/public/images/digitallibrary.png',
              icon: Globe
            },
            {
              title: 'Sports Complex',
              description: 'Football field, basketball court, volleyball court and gymnasium',
              image: '/public/images/sport.jpeg',
              icon: Trophy
            },
            {
              title: 'Computer Laboratory',
              description: '50 modern computers with high-speed internet connectivity',
              image: '/public/images/clap.jpg',
              icon: Settings
            },
            {
              title: 'Student Cafeteria',
              description: 'Nutritious meals and snacks served in a clean, modern environment',
              image: '/public/images/cantin.jpeg',
              icon: Star
            }
          ].map((facility, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <facility.icon className="h-6 w-6 mb-2" />
                  <h3 className="font-bold text-lg">{facility.title}</h3>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-gray-600 text-sm">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Principal's Message */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Principal's Message</h2>
            <p className="text-blue-100 leading-relaxed mb-4">
              Welcome to Champion Comprehensive High School Makenene, where we believe every student 
              has the potential to excel. Our dedicated faculty and staff work tirelessly to provide 
              quality education that prepares our students for successful futures.
            </p>
            <div className="flex items-center space-x-3">
              <img 
                src="/public/images/WhatsApp Image 2025-08-29 at 1.37.24 PM.jpeg" 
                alt="Principal" 
                className="w-15 h-15 rounded-full border-2 border-white"
              />
              <div>
                <p className="font-semibold">Njua Elvis NSOM</p>
                <p className="text-blue-200 text-sm">School Principal</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <img 
              src="/public/images/building2.jpeg" 
              alt="School Building" 
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Awards & Achievements */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Trophy className="h-6 w-6 mr-2 text-yellow-600" />
          Awards and Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { year: '2024', award: 'Best Secondary School - Centre Region', emoji: '🏆' },
            { year: '2023', award: 'Excellence in Science Education', emoji: '🔬' },
            { year: '2022', award: 'Outstanding Sports Performance', emoji: '⚽' },
            { year: '2021', award: 'Digital Innovation Award', emoji: '💻' }
          ].map((achievement, index) => (
            <div key={index} className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-4xl mb-2">{achievement.emoji}</div>
              <h4 className="font-bold text-yellow-800">{achievement.year}</h4>
              <p className="text-sm text-gray-600">{achievement.award}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Champion Bilinguals Comprehensive High School?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: TrendingUp,
              title: 'Academic Excellence',
              description: 'Consistently high GCE pass rates and university admissions'
            },
            {
              icon: Users,
              title: 'Experienced Faculty',
              description: 'Qualified teachers with years of educational experience'
            },
            {
              icon: Globe,
              title: 'Modern Facilities',
              description: 'State-of-the-art equipment and learning environments'
            },
            {
              icon: Trophy,
              title: 'Holistic Development',
              description: 'Sports, arts, and character building programs'
            },
            {
              icon: BookOpen,
              title: 'Rich Curriculum',
              description: 'Comprehensive subjects preparing students for future success'
            },
            {
              icon: Award,
              title: 'Proven Results',
              description: '25 years of producing successful graduates'
            }
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <feature.icon className="h-12 w-12 mx-auto mb-3 text-yellow-300" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-green-100 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Student Life */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Student Life at CBCHS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Academic Clubs', image: '/public/images/music.jpeg', desc: 'Math, Science, and Debate clubs' },
            { title: 'Sports Teams', image: '/public/images/sport.jpeg', desc: 'Football, Basketball, Athletics' },
            { title: 'Cultural Events', image: '/public/images/music.jpeg', desc: 'Music, Drama, and Art festivals' },
            { title: 'Community Service', image: '/public/images/community.jpeg', desc: 'Giving back to our community' }
          ].map((activity, index) => (
            <div key={index} className="text-center group">
              <img
                src={activity.image}
                alt={activity.title}
                className="w-full h-32 object-cover rounded-lg mb-3 transition-transform group-hover:scale-105"
              />
              <h4 className="font-semibold text-gray-800">{activity.title}</h4>
              <p className="text-sm text-gray-600">{activity.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About & Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <School className="h-6 w-6 mr-2 text-blue-600" />
            {t.aboutUs}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Champion Comprehensive High School Makenene has been a beacon of educational excellence 
            since 2000. We pride ourselves on nurturing young minds with quality education, 
            character development, and preparing students for the challenges of tomorrow.
          </p>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-50 p-3 rounded">
              <h4 className="font-bold text-blue-600">Founded</h4>
              <p className="text-gray-600">2000</p>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <h4 className="font-bold text-green-600">Motto</h4>
              <p className="text-gray-600 text-sm">Excellence & Character</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Phone className="h-6 w-6 mr-2 text-green-600" />
            {t.contactUs}
          </h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-500 mr-3" />
              <span>Makenene, Centre Region, Cameroon</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-500 mr-3" />
              <span>+237 677 123 456</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-500 mr-3" />
              <span>info@cchsmakenene.edu.cm</span>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <h4 className="font-semibold mb-2">Office Hours</h4>
              <p className="text-sm text-gray-600">Monday - Friday: 7:30 AM - 5:00 PM</p>
              <p className="text-sm text-gray-600">Saturday: 8:00 AM - 12:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TeacherDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">{t.teacherDashboard}</h2>
        <button
          onClick={() => setIsAdminMode(!isAdminMode)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
        >
          <Settings className="h-4 w-4" />
          <span>Toggle Admin Mode</span>
        </button>
      </div>

      {/* Add Student Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Add New Student Record</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Student Full Name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Class (e.g., Form 5A, Form 4B, Upper Sixth, Lower Sixth, Form 1, Form 2)"
              value={newStudent.class}
              onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700">Subject Marks (out of 20)</h4>
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(newStudent.subjects).map(subject => (
                <input
                  key={subject}
                  type="number"
                  placeholder={`${subject} mark`}
                  min="0"
                  max="20"
                  value={newStudent.subjects[subject]}
                  onChange={(e) => setNewStudent({
                    ...newStudent,
                    subjects: {
                      ...newStudent.subjects,
                      [subject]: e.target.value
                    }
                  })}
                  className="border border-gray-300 rounded px-3 py-2 focus:border-blue-500 focus:outline-none"
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <button
            onClick={addStudent}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center space-x-2 font-medium"
          >
            <Plus className="h-5 w-5" />
            <span>Add Student & Generate Link</span>
          </button>
        </div>

        {/* Generated Link Display */}
        {generatedLink && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Student Profile Link Generated!</h4>
            <div className="flex items-center space-x-2">
              <a
                href={generatedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 border border-blue-300 rounded px-3 py-2 text-sm bg-white text-blue-600 hover:text-blue-800 hover:underline truncate"
                onClick={(e) => e.stopPropagation()}
              >
                {generatedLink}
              </a>
              <button
                onClick={copyLink}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-1"
              >
                <Download className="h-4 w-4" />
                <span>Copy</span>
              </button>
              <button
                onClick={openLink}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center space-x-1"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Open</span>
              </button>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              Click the link to view the student profile or copy it to share with parents or administrators.
            </p>
          </div>
        )}
      </div>

      {/* Students List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Student Records</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>{students.length} students registered</span>
          </div>
        </div>
        
        {students.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-500 mb-2">No Students Added Yet</h4>
            <p className="text-gray-400 mb-6">Start by adding your first student record above.</p>
            <div className="bg-gray-50 p-6 rounded-lg max-w-md mx-auto">
              <h5 className="font-semibold text-gray-700 mb-3">How it works:</h5>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <span>Enter student name and class</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <span>Add marks for each subject</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span>Get shareable student profile link</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left">Photo</th>
                  <th className="border border-gray-200 p-3 text-left">Name</th>
                  <th className="border border-gray-200 p-3 text-left">Class</th>
                  <th className="border border-gray-200 p-3 text-left">Average</th>
                  <th className="border border-gray-200 p-3 text-left">Subjects</th>
                  <th className="border border-gray-200 p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 p-3">
                      <img src={student.photo} alt={student.name} className="w-12 h-12 rounded-full" />
                    </td>
                    <td className="border border-gray-200 p-3 font-medium">{student.name}</td>
                    <td className="border border-gray-200 p-3">{student.class}</td>
                    <td className="border border-gray-200 p-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-bold">
                        {calculateAverage(student.subjects)}/20
                      </span>
                    </td>
                    <td className="border border-gray-200 p-3">
                      <div className="space-y-1 text-xs">
                        {Object.entries(student.subjects).map(([subject, mark]) => (
                          <div key={subject} className="flex justify-between">
                            <span className="text-gray-600">{subject}:</span>
                            <span className="font-medium">{mark}/20</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="border border-gray-200 p-3">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            const encodedData = btoa(JSON.stringify(student));
                            const link = `${window.location.origin}${window.location.pathname}?student=${encodedData}`;
                            setGeneratedLink(link);
                          }}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100"
                          title="Generate Link"
                        >
                          <Globe className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteStudent(student.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100"
                          title="Delete Student"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Generated Link Display for existing students */}
        {generatedLink && students.length > 0 && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              Student Profile Link Ready!
            </h4>
            <div className="flex items-center space-x-2">
              <a
                href={generatedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 border border-green-300 rounded px-3 py-2 text-sm bg-white text-green-600 hover:text-green-800 hover:underline truncate"
                onClick={(e) => e.stopPropagation()}
              >
                {generatedLink}
              </a>
              <button
                onClick={copyLink}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center space-x-1"
              >
                <Download className="h-4 w-4" />
                <span>Copy</span>
              </button>
              <button
                onClick={openLink}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-1"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Open</span>
              </button>
            </div>
            <p className="text-xs text-green-600 mt-2">
              Link generated successfully! Click to view or share with parents or guardians.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const TopPerformersSection = () => {
    if (students.length === 0) {
      return (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center">
            <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
            {t.topPerformers}
          </h2>
          <div className="text-center py-12 bg-white rounded-lg shadow-lg">
            <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No Performance Data Yet</h3>
            <p className="text-gray-400">Add students in the Teacher Dashboard to see top performers here.</p>
          </div>
        </div>
      );
    }

    const topPerformers = getTopPerformers();
    
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center">
          <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
          {t.topPerformers}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topPerformers.map((student, index) => (
            <div key={student.id} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="relative">
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                }`}>
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{student.name}</h3>
              <p className="text-gray-600 mb-2">{student.class}</p>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-lg font-bold">
                {student.average}/20
              </div>
              <div className="mt-4 space-y-1 text-sm">
                {Object.entries(student.subjects).map(([subject, mark]) => (
                  <div key={subject} className="flex justify-between">
                    <span>{subject}:</span>
                    <span className="font-medium">{mark}/20</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const TimetableSection = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center">
        <Clock className="h-8 w-8 text-blue-500 mr-3" />
        {t.timetable}
      </h2>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Form 5A Weekly Schedule</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-50">
                <th className="border border-blue-200 p-3">Time</th>
                <th className="border border-blue-200 p-3">Monday</th>
                <th className="border border-blue-200 p-3">Tuesday</th>
                <th className="border border-blue-200 p-3">Wednesday</th>
                <th className="border border-blue-200 p-3">Thursday</th>
                <th className="border border-blue-200 p-3">Friday</th>
              </tr>
            </thead>
            <tbody>
              {[
                '8:00-9:00', '9:00-10:00', '10:30-11:30', '11:30-12:30', '14:00-15:00'
              ].map((time, timeIndex) => (
                <tr key={time} className="hover:bg-gray-50">
                  <td className="border border-gray-200 p-3 font-medium bg-gray-50">{time}</td>
                  {Object.entries(timetableData['Form 5A']).map(([day, subjects]) => (
                    <td key={day} className="border border-gray-200 p-3">
                      <div className={`p-2 rounded text-center text-white ${
                        ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-yellow-500'][timeIndex]
                      }`}>
                        {subjects[timeIndex]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const PerformanceSection = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center">
        <BarChart3 className="h-8 w-8 text-green-500 mr-3" />
        {t.performance}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Class Averages by Subject</h3>
          <div className="space-y-4">
            {['Math', 'Physics', 'Chemistry', 'English', 'Biology'].map((subject, index) => {
              const percentage = [85, 78, 82, 75, 80][index];
              return (
                <div key={subject}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{subject}</span>
                    <span className="text-sm text-gray-600">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Performance Trends</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded">
              <span>Sequence 1 Average</span>
              <span className="font-bold text-green-600">16.2/20</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
              <span>Sequence 2 Average</span>
              <span className="font-bold text-blue-600">15.8/20</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded">
              <span>Sequence 3 Average</span>
              <span className="font-bold text-purple-600">16.5/20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const StudyResourcesSection = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center">
        <BookOpen className="h-8 w-8 text-purple-500 mr-3" />
        {t.studyResources}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <FileText className="h-12 w-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Past Questions</h3>
          <p className="text-gray-600 mb-4">Access previous GCE examination papers and practice questions.</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2">
            <Download className="h-4 w-4" />
           <a href="https://estudyuniverse.com/gce-revision-past-papers-for-ordinary-and-advanced-level/"> <span>Download</span></a>
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Globe className="h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Online Resources</h3>
          <p className="text-gray-600 mb-4">Links to educational platforms and interactive learning tools.</p>
         <a href="https://www.prodigygame.com/main-en/blog/virtual-learning-tools"> <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Explore Links
          </button></a>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <TrendingUp className="h-12 w-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Study Tips</h3>
          <p className="text-gray-600 mb-4">Proven strategies for effective studying and exam preparation.</p>
         <a href="https://shorelight.com/student-stories/21-best-study-tips-for-final-exams/"> <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Read Tips
          </button></a>
        </div>
      </div>
    </div>
  );

  const CalendarSection = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center">
        <Calendar className="h-8 w-8 text-red-500 mr-3" />
        {t.calendar}
      </h2>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Upcoming Academic Events</h3>
        <div className="space-y-4">
          {academicEvents.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  event.type === 'exam' ? 'bg-red-500' : 
                  event.type === 'meeting' ? 'bg-blue-500' : 'bg-green-500'
                }`}></div>
                <div>
                  <h4 className="font-semibold">{event.title}</h4>
                  <p className="text-sm text-gray-600">{event.date}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded text-xs font-medium ${
                event.type === 'exam' ? 'bg-red-100 text-red-800' :
                event.type === 'meeting' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {event.type.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const FeedbackSection = () => {
    const [newFeedback, setNewFeedback] = useState({ name: '', email: '', message: '' });

    const submitFeedback = () => {
      if (newFeedback.name && newFeedback.message) {
        setFeedback([...feedback, { ...newFeedback, id: Date.now(), date: new Date().toLocaleDateString() }]);
        setNewFeedback({ name: '', email: '', message: '' });
      }
    };

    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold flex items-center">
          <MessageSquare className="h-8 w-8 text-orange-500 mr-3" />
          {t.feedback}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Leave Your Feedback</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={newFeedback.name}
                onChange={(e) => setNewFeedback({...newFeedback, name: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="email"
                placeholder="Your Email (Optional)"
                value={newFeedback.email}
                onChange={(e) => setNewFeedback({...newFeedback, email: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <textarea
                placeholder="Your message or suggestions..."
                value={newFeedback.message}
                onChange={(e) => setNewFeedback({...newFeedback, message: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2 h-32"
                rows="4"
              ></textarea>
              <button
                onClick={submitFeedback}
                className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 flex items-center justify-center space-x-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Submit Feedback</span>
              </button>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Recent Feedback</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {feedback.length > 0 ? feedback.slice(-5).reverse().map(item => (
                <div key={item.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{item.name}</h4>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.message}</p>
                </div>
              )) : (
                <p className="text-gray-500 text-center">No feedback yet. Be the first to share your thoughts!</p>
              )}
            </div>
            </div>
        </div>
      </div>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home': return <HomeSection />;
      case 'teacher': return <TeacherDashboard />;
      case 'timetable': return <TimetableSection />;
      case 'performers': return <TopPerformersSection />;
      case 'performance': return <PerformanceSection />;
      case 'resources': return <StudyResourcesSection />;
      case 'calendar': return <CalendarSection />;
      case 'feedback': return <FeedbackSection />;
      default: return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
{/* Mobile Menu Overlay */}
{mobileMenuOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
    onClick={() => setMobileMenuOpen(false)}
  >
    <div
      className="bg-white w-64 h-full p-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Menu</h3>
        <button onClick={() => setMobileMenuOpen(false)}>
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="space-y-2">
        {[
          { id: 'home', icon: User, label: t.home },
          { id: 'teacher', icon: Users, label: t.teacherDashboard },
          { id: 'timetable', icon: Clock, label: t.timetable },
          { id: 'performers', icon: Trophy, label: t.topPerformers },
          { id: 'performance', icon: BarChart3, label: t.performance },
          { id: 'resources', icon: BookOpen, label: t.studyResources },
          { id: 'calendar', icon: Calendar, label: t.calendar },
          { id: 'feedback', icon: MessageSquare, label: t.feedback }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveSection(item.id);
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left flex items-center space-x-2 px-3 py-2 rounded transition-colors ${
              activeSection === item.id
                ? 'bg-blue-100 text-blue-600'
                : 'hover:bg-gray-100'
            }`}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
)}

      
      <main className="container mx-auto px-4 py-8">
        {renderSection()}
      </main>
      
      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <School className="h-6 w-6" />
                <span className="font-bold">CBCHS Makenene / COLPOBIC</span>
              </div>
              <p className="text-blue-200">
                Excellence in Education, Character in Leadership
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <div className="space-y-2 text-blue-200">
                <p className="cursor-pointer hover:text-white" onClick={() => setActiveSection('home')}>Home</p>
                <p className="cursor-pointer hover:text-white" onClick={() => setActiveSection('performers')}>Top Performers</p>
                <p className="cursor-pointer hover:text-white" onClick={() => setActiveSection('resources')}>Resources</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact Info</h4>
              <div className="space-y-2 text-blue-200">
                <p className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> P.O Box 10, Makenene, Centre Region, Cameroon</p>
                <p className="flex items-center"><Phone className="h-4 w-4 mr-2" /> +237 672 774 307 / +237650079756</p>
                <p className="flex items-center"><Mail className="h-4 w-4 mr-2" /> championscbcc@yahoo.com</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500">
                  <Globe className="h-4 w-4" />
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500">
                  <Mail className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-6 pt-6 text-center text-blue-200">
            <p>&copy; 2025 Champion Comprehensive High School Makenene. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SchoolWebsite;