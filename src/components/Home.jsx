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
  Save
} from 'lucide-react';

const SchoolWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [language, setLanguage] = useState('en');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Sample data
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: 'Jean Baptiste Nkomo', 
      class: 'Form 5A', 
      subjects: { Math: 18, Physics: 16, Chemistry: 17, English: 15 },
      photo: '/api/placeholder/80/80',
      sequence: 1
    },
    { 
      id: 2, 
      name: 'Marie Claire Foka', 
      class: 'Form 5A', 
      subjects: { Math: 19, Physics: 18, Chemistry: 19, English: 17 },
      photo: '/api/placeholder/80/80',
      sequence: 1
    },
    { 
      id: 3, 
      name: 'Paul Mbarga', 
      class: 'Form 4B', 
      subjects: { Math: 14, Physics: 13, Chemistry: 15, English: 16 },
      photo: '/api/placeholder/80/80',
      sequence: 1
    }
  ]);

  const [announcements, setAnnouncements] = useState([
    "GCE Mock Exams start March 15th, 2025",
    "Parent-Teacher Meeting scheduled for March 8th",
    "New library books available for checkout",
    "Science Fair registration now open"
  ]);

  const [feedback, setFeedback] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', class: '', subjects: {} });

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
      welcome: 'Welcome to Champion Comprehensive High School Makenene',
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
      welcome: 'Bienvenue au Lycée Polyvalent Champion Makenene',
      motto: 'Excellence dans l\'Éducation, Caractère dans le Leadership',
      aboutUs: 'À Propos',
      contactUs: 'Nous Contacter'
    }
  };

  const t = translations[language];

  const campusImages = [
    { url: '/api/placeholder/800/400', caption: 'Main School Building' },
    { url: '/api/placeholder/800/400', caption: 'Science Laboratory' },
    { url: '/api/placeholder/800/400', caption: 'Library and Study Hall' },
    { url: '/api/placeholder/800/400', caption: 'Sports Complex' },
    { url: '/api/placeholder/800/400', caption: 'Computer Lab' }
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
    { date: '2025-05-20', title: 'GCE Examinations', type: 'exam' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % campusImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const calculateAverage = (subjects) => {
    const values = Object.values(subjects);
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  };

  const getTopPerformers = () => {
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
      setStudents([...students, {
        ...newStudent,
        id: students.length + 1,
        photo: '/api/placeholder/80/80'
      }]);
      setNewStudent({ name: '', class: '', subjects: {} });
    }
  };

  const Navigation = () => (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <School className="h-8 w-8" />
            <span className="font-bold text-lg">CCHS Makenene</span>
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

      {/* About & Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <School className="h-6 w-6 mr-2 text-blue-600" />
            {t.aboutUs}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Champion Comprehensive High School Makenene has been a beacon of educational excellence 
            since 2000. We pride ourselves on nurturing young minds with quality education, 
            character development, and preparing students for the challenges of tomorrow.
          </p>
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
        <h3 className="text-xl font-semibold mb-4">Add New Student</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Student Name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Class (e.g., Form 5A)"
            value={newStudent.class}
            onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <button
            onClick={addStudent}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center justify-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Student Records</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-3 text-left">Photo</th>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Class</th>
                <th className="border p-3 text-left">Average</th>
                <th className="border p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="border p-3">
                    <img src={student.photo} alt={student.name} className="w-10 h-10 rounded-full" />
                  </td>
                  <td className="border p-3 font-medium">{student.name}</td>
                  <td className="border p-3">{student.class}</td>
                  <td className="border p-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {calculateAverage(student.subjects)}/20
                    </span>
                  </td>
                  <td className="border p-3">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const TopPerformersSection = () => {
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
            <a href="https://estudyuniverse.com/gce-revision-past-papers-for-ordinary-and-advanced-level/">Download</a>
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

  const VirtualTourSection = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center">
        <Camera className="h-8 w-8 text-indigo-500 mr-3" />
        {t.virtualTour}
      </h2>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campusImages.map((image, index) => (
            <div key={index} className="relative group cursor-pointer">
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-64 object-cover rounded-lg transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-lg flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-center font-medium">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Campus Facilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Modern Classrooms', desc: '40 well-equipped classrooms with smart boards' },
            { name: 'Science Laboratories', desc: 'Physics, Chemistry, and Biology labs' },
            { name: 'Computer Lab', desc: '50 computers with internet access' },
            { name: 'Library', desc: 'Over 10,000 books and digital resources' },
            { name: 'Sports Complex', desc: 'Football field, basketball court, and gym' },
            { name: 'Cafeteria', desc: 'Nutritious meals and snacks for students' }
          ].map((facility, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-indigo-600 mb-2">{facility.name}</h4>
              <p className="text-sm text-gray-600">{facility.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const GCEResultsSection = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center">
        <Award className="h-8 w-8 text-yellow-500 mr-3" />
        {t.gceResults}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">GCE O-Level Results 2024</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded">
              <span>Overall Pass Rate</span>
              <span className="font-bold text-green-600">95.2%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
              <span>Grade A Students</span>
              <span className="font-bold text-blue-600">45%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
              <span>Total Candidates</span>
              <span className="font-bold text-purple-600">248</span>
            </div>
          </div>
          <button className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center justify-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Download Full Results</span>
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">GCE A-Level Results 2024</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-green-50 rounded">
              <span>Overall Pass Rate</span>
              <span className="font-bold text-green-600">88.7%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
              <span>Grade A Students</span>
              <span className="font-bold text-blue-600">32%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
              <span>Total Candidates</span>
              <span className="font-bold text-purple-600">156</span>
            </div>
          </div>
          <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Download Full Results</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Historical Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-3 text-left">Year</th>
                <th className="border p-3 text-left">O-Level Pass Rate</th>
                <th className="border p-3 text-left">A-Level Pass Rate</th>
                <th className="border p-3 text-left">Best Student</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border p-3">2024</td>
                <td className="border p-3">95.2%</td>
                <td className="border p-3">88.7%</td>
                <td className="border p-3">Marie Claire Foka</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border p-3">2023</td>
                <td className="border p-3">93.8%</td>
                <td className="border p-3">86.2%</td>
                <td className="border p-3">Paul Mbarga</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border p-3">2022</td>
                <td className="border p-3">91.5%</td>
                <td className="border p-3">84.3%</td>
                <td className="border p-3">Jean Baptiste Nkomo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

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
      case 'tour': return <VirtualTourSection />;
      case 'gce': return <GCEResultsSection />;
      default: return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-white w-64 h-full p-4" onClick={(e) => e.stopPropagation()}>
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
                { id: 'tour', icon: Camera, label: t.virtualTour },
                { id: 'gce', icon: Award, label: t.gceResults },
                { id: 'resources', icon: BookOpen, label: t.studyResources },
                { id: 'calendar', icon: Calendar, label: t.calendar },
                { id: 'feedback', icon: MessageSquare, label: t.feedback }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left flex items-center space-x-2 px-3 py-2 rounded transition-colors ${
                    activeSection === item.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
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
                <span className="font-bold">CCHS Makenene</span>
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
                <p className="cursor-pointer hover:text-white" onClick={() => setActiveSection('gce')}>GCE Results</p>
                <p className="cursor-pointer hover:text-white" onClick={() => setActiveSection('resources')}>Resources</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact Info</h4>
              <div className="space-y-2 text-blue-200">
                <p className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> Makenene, Centre</p>
                <p className="flex items-center"><Phone className="h-4 w-4 mr-2" /> +237 677 123 456</p>
                <p className="flex items-center"><Mail className="h-4 w-4 mr-2" /> info@cchsmakenene.edu.cm</p>
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