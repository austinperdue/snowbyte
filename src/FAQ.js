// src/pages/FAQ.js
import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const faqs = [
    { question: 'How do I purchase lift tickets?', answer: 'You can purchase lift tickets online through our website or at the ticket window on-site.' },
    { question: 'Can I get a refund on lift tickets if I can\'t make it to the resort?', answer: 'Refunds are not available for lift tickets, but we do offer a credit for a future visit if you cancel in advance.' },
    { question: 'How do I rent equipment?', answer: 'You can rent equipment at our rental shop on-site or reserve it online in advance.' },
    { question: 'What kind of equipment do you rent?', answer: 'We rent skis, snowboards, boots, helmets, and other snow sports gear.' },
    { question: 'How much does equipment rental cost?', answer: 'Equipment rental prices vary depending on the type of equipment and the length of rental. You can view our rental prices on our website.' },
    { question: 'Do you offer lessons for beginners?', answer: 'Yes, we offer lessons for beginners of all ages. You can book a lesson online or at the ski school desk on-site.' },
    { question: 'What should I do if I get injured while skiing or snowboarding?', answer: 'Please alert ski patrol immediately if you are injured. They will assist you and transport you to the ski patrol clinic for treatment.' },
    { question: 'Is there a dress code for skiing or snowboarding?', answer: 'There is no specific dress code, but we recommend wearing warm and waterproof clothing to stay comfortable on the mountain.' },
    { question: 'Can I bring my own food and drinks to the resort?', answer: 'Outside food and drinks are not allowed in the lodge or on the mountain. We have several restaurants and cafes on-site for your convenience.' },
    { question: 'Are there any discounts for children or seniors?', answer: 'Yes, we offer discounts for children and seniors on lift tickets, rentals, and lessons.' },
    { question: 'What if the weather is bad on the day I planned to visit?', answer: 'We cannot control the weather, but we do offer a weather guarantee. If you are unable to ski or snowboard due to weather conditions, you can receive a credit for a future visit.' },
    { question: 'Can I ski or snowboard at night?', answer: 'Yes, we offer night skiing and snowboarding on select days of the week. Check our website for the current schedule.' },
    { question: 'Is there a lost and found at the resort?', answer: 'Yes, we have a lost and found located in the main lodge. Please check with guest services if you have lost an item.' },
    { question: 'Can I bring my dog to the resort?', answer: 'Dogs are not allowed on the mountain or in the lodge. We do have a dog kennel on-site for your convenience.' },
    { question: 'How do I pay for my purchases at the resort?', answer: 'You can pay with cash or credit card at most locations on-site. We also accept Apple Pay and Google Wallet.' },
    { question: 'Can I rent a locker to store my belongings?', answer: 'Yes, lockers are available for rent on-site. You can reserve one in advance or rent one on the day of your visit.' },

    // ...
];

export default function FAQ() {
    return (
        <Box sx={{ flexGrow: 1, padding: 4, textAlign: 'center' }}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Typography
                variant="h3"
                sx={{ fontFamily: 'Russo One, sans-serif', marginBottom: 4 }}
            >
                FREQUENTLY ASKED QUESTIONS
            </Typography>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Box sx={{ textAlign: 'left', maxWidth: '80%', margin: '0 auto' }}>
                {faqs.map((faq, index) => (
                    <Accordion
                        key={index}
                        sx={{
                            backgroundColor: '#f5f5f5',
                            border: '1px solid #e0e0e0',
                            boxShadow: 'none',
                            '&:before': {
                                display: 'none'
                            },
                            '&.Mui-expanded': {
                                margin: 'auto'
                            },
                            '&.MuiAccordion-root': {
                                marginBottom: 2
                            }
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`faq-content-${index}`}
                            id={`faq-header-${index}`}
                        >
                            <Typography
                                sx={{
                                    fontFamily: 'Russo One, sans-serif'
                                }}
                            >
                                {faq.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography
                                sx={{
                                    fontFamily: 'Bitter, serif',
                                    fontSize: '1.1rem',
                                    lineHeight: 1.5,
                                    color: ''
                                }}
                            >
                                {faq.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Box 
            
            sx={{ 
                textAlign: 'center', 
                marginTop: 4,
                display: { xs: 'block', sm: 'block'}
                }}
                >
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontFamily: 'Russo One, sans-serif' }}
                >
                    Can't find your question?
                </Typography>
                <br></br>
                <Typography sx={{ fontFamily: 'Bitter, serif' }}>
                    If you can't find the answer to your question in our FAQ, please feel free to contact our support team. We are always here to help and provide you with any information you need. You can reach us by phone, email, or through our online contact form.
                </Typography>
            </Box>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

        </Box>

    );
}