export type ServiceCategory = {
  id: number;
  title: string;
  description: string;
  image: any;
  features: string[]; // doctor keys from featureConfigs.ts
};

// ✅ UPDATED with varying stars

export const serviceData: ServiceCategory[] = [
  {
    id: 1,
    title: 'ENT Specialist',
    description: 'Get expert consultation for ear, nose, and throat problems.',
    image: require('../assets/images/ENT Specialist.jpg'),
    features: [
      'Dr. Rahul Mehta (⭐️⭐️⭐️⭐️⭐️)',
      'Dr. Kavita Kapoor (⭐️⭐️⭐️⭐️)',
      'Dr. Vivek Chandra (⭐️⭐️⭐️)',
      'Dr. Ananya Sood (⭐️⭐️⭐️⭐️⭐️)',
      'Dr. Shubham Rathi (⭐️⭐️⭐️)',
      'Dr. Isha Sharma (⭐️⭐️⭐️⭐️)',
      'Dr. Mohit Verma (⭐️⭐️)',
      'Dr. Ruchi Dey (⭐️⭐️⭐️⭐️)',
      'Dr. Neeraj Mishra (⭐️⭐️⭐️⭐️⭐️)',
      'Dr. Pooja Thakur (⭐️⭐️⭐️)',
    ],
  },
  {
    id: 2,
    title: 'Pediatrician',
    description: 'Book child specialists for vaccination and health check-ups.',
    image: require('../assets/images/ENT Specialist.jpg'),
    features: [
      'Dr. Meera Das (⭐️⭐️⭐️⭐️)',
      'Dr. Alok Rathi (⭐️⭐️)',
      'Dr. Sneha Khandelwal (⭐️⭐️⭐️⭐️)',
      'Dr. Kunal Joshi (⭐️⭐️⭐️)',
      'Dr. Riya Arora (⭐️⭐️⭐️⭐️⭐️)',
      'Dr. Varun Yadav (⭐️⭐️⭐️⭐️)',
      'Dr. Priyanka Mehta (⭐️⭐️⭐️)',
      'Dr. Manish Kaul (⭐️⭐️⭐️⭐️)',
      'Dr. Preeti Narang (⭐️⭐️⭐️⭐️⭐️)',
    ],
  },
  {
    id: 3,
    title: 'Orthopedic Specialist',
    description: 'Get treatment for bone, joint, and spine-related issues.',
    image: require('../assets/images/Orthopedic Specialist.jpg'),
    features: [
      'Dr. Rakesh Singh (⭐️⭐️⭐️⭐️)',
      'Dr. Aman Bansal (⭐️⭐️⭐️)',
      'Dr. Supriya Narang (⭐️⭐️⭐️⭐️⭐️)',
      'Dr. Hemant Sharma (⭐️⭐️)',
      'Dr. Kavya Rajput (⭐️⭐️⭐️⭐️)',
      'Dr. Nitin Deshmukh (⭐️⭐️⭐️)',
      'Dr. Sameer Chauhan (⭐️⭐️⭐️⭐️)',
      'Dr. Vaibhav Sinha (⭐️⭐️⭐️⭐️⭐️)',
      'Dr. Renu Verma (⭐️⭐️⭐️⭐️)',
    ],
  },
  {
    id: 4,
    title: 'Gynecologist',
    description:
      'Consult women’s health experts for pregnancy, PCOD, and menstrual issues.',
    image: require('../assets/images/Gynecologist.jpg'),
    features: [
      'Dr. Sanjana Gupta (⭐️⭐️⭐️⭐️⭐️)',
      'Dr. Neha Verma (⭐️⭐️⭐️)',
      'Dr. Anjali Sharma (⭐️⭐️⭐️⭐️)',
      'Dr. Swati Patil (⭐️⭐️)',
      'Dr. Komal Mehra (⭐️⭐️⭐️⭐️⭐️)',
      'Dr. Rajni Tyagi (⭐️⭐️⭐️⭐️)',
      'Dr. Shalini Dey (⭐️⭐️⭐️)',
      'Dr. Varsha Kaushik (⭐️⭐️⭐️⭐️)',
      'Dr. Divya Sharma (⭐️⭐️⭐️)',
      'Dr. Rekha Tiwari (⭐️⭐️⭐️⭐️⭐️)',
    ],
  },
  {
    id: 5,
    title: 'General Physician',
    description:
      'Consult general doctors for common illnesses, fever, and check-ups.',
    image: require('../assets/images/General Physician.jpg'),
    features: [
      'Dr. Priya Jain (⭐️⭐️⭐️⭐️)',
      'Dr. Ravi Kapoor (⭐️⭐️⭐️⭐️)',
      'Dr. Alisha Das (⭐️⭐️⭐️)',
      'Dr. Rohan Seth (⭐️⭐️⭐️⭐️⭐️)',
      'Dr. Monica Pillai (⭐️⭐️⭐️⭐️)',
      'Dr. Tarun Rathi (⭐️⭐️⭐️)',
      'Dr. Harshita Goyal (⭐️⭐️)',
      'Dr. Karan Malhotra (⭐️⭐️⭐️⭐️)',
      'Dr. Jyoti Rawat (⭐️⭐️⭐️⭐️⭐️)',
    ],
  },
  {
    id: 6,
    title: 'Dermatologist',
    description:
      'Book skin specialists for acne, rashes, hair fall, and skin care advice.',
    image: require('../assets/images/Dermatologist.jpg'),
    features: [
      'Dr. Sneha Roy (⭐️⭐️⭐️⭐️)',
      'Dr. Nikhil Mathur (⭐️⭐️)',
      'Dr. Ritu Bansal (⭐️⭐️⭐️⭐️⭐️)',
      'Dr. Kanishka Dutt (⭐️⭐️⭐️⭐️)',
      'Dr. Tanya Bakshi (⭐️⭐️⭐️)',
      'Dr. Aryan Raj (⭐️⭐️⭐️⭐️⭐️)',
      'Dr. Smita Sinha (⭐️⭐️⭐️)',
      'Dr. Ekta Rawal (⭐️⭐️⭐️⭐️)',
      'Dr. Rohit Anand (⭐️⭐️⭐️⭐️⭐️)',
    ],
  },
  {
    id: 7,
    title: 'Cardiologist',
    description:
      'Get expert care for heart-related issues and blood pressure management.',
    image: require('../assets/images/Cardiologist.jpg'),
    features: [
      'Dr. Vivek Malhotra (⭐️⭐️⭐️⭐️)',
      'Dr. Rajiv Ahuja (⭐️⭐️⭐️⭐️⭐️)',
      'Dr. Anshika Sen (⭐️⭐️⭐️)',
      'Dr. Devendra Rathi (⭐️⭐️)',
      'Dr. Mitali Chopra (⭐️⭐️⭐️⭐️)',
      'Dr. Ashok Bansal (⭐️⭐️⭐️⭐️⭐️)',
      'Dr. Shivani Nair (⭐️⭐️⭐️⭐️)',
      'Dr. Nilesh Kulkarni (⭐️⭐️⭐️)',
      'Dr. Vikas Sethi (⭐️⭐️⭐️⭐️⭐️)',
    ],
  },
  {
    id: 8,
    title: 'Psychiatrist',
    description:
      'Mental health support for anxiety, depression, and behavioral issues.',
    image: require('../assets/images/Psychiatrist.jpg'),
    features: [
      'Dr. Shruti Sharma (⭐️⭐️⭐️)',
      'Dr. Aditya Khanna (⭐️⭐️⭐️⭐️)',
      'Dr. Tanya Grover (⭐️⭐️⭐️⭐️)',
      'Dr. Raghav Mittal (⭐️⭐️⭐️⭐️⭐️)',
      'Dr. Snehal Dixit (⭐️⭐️)',
      'Dr. Karthik Iyer (⭐️⭐️⭐️)',
      'Dr. Mehul Shroff (⭐️⭐️⭐️⭐️)',
      'Dr. Natasha Sehgal (⭐️⭐️⭐️⭐️⭐️)',
      'Dr. Aditi Bansal (⭐️⭐️⭐️)',
    ],
  },
  {
    id: 9,
    title: 'Covid-19 Specialist',
    description: 'Consult Covid experts for symptoms, tests, and recovery plans.',
    image: require('../assets/images/Covid-19 Specialist.jpg'),
    features: [
      'Dr. Arjun Sethi (⭐️⭐️⭐️⭐️)',
      'Dr. Manisha Rathi (⭐️⭐️⭐️⭐️⭐️)',
      'Dr. Deepak Tiwari (⭐️⭐️⭐️)',
      'Dr. Rekha Chopra (⭐️⭐️)',
      'Dr. Amaan Khan (⭐️⭐️⭐️⭐️)',
      'Dr. Sonali Saxena (⭐️⭐️⭐️⭐️⭐️)',
      'Dr. Yogesh Malviya (⭐️⭐️⭐️⭐️)',
      'Dr. Seema Pandey (⭐️⭐️⭐️)',
      'Dr. Vishal Rana (⭐️⭐️⭐️⭐️⭐️)',
    ],
  },
  {
    id: 10,
    title: 'Emergency Care',
    description:
      '24x7 emergency services for accidents, trauma, and critical care.',
    image: require('../assets/images/Emergency Care.jpg'),
    features: [
      'Dr. Suresh Iyer (⭐️⭐️⭐️⭐️)',
      'Dr. Pallavi Rao (⭐️⭐️⭐️)',
      'Dr. Faizan Khan (⭐️⭐️⭐️⭐️⭐️)',
      'Dr. Ruchi Sharma (⭐️⭐️)',
      'Dr. Alok Taneja (⭐️⭐️⭐️)',
      'Dr. Meera Vyas (⭐️⭐️⭐️⭐️)',
      'Dr. Danish Qureshi (⭐️⭐️⭐️⭐️⭐️)',
      'Dr. Simran Kohli (⭐️⭐️⭐️)',
      'Dr. Vikram Pal (⭐️⭐️⭐️⭐️)',
    ],

  },

];