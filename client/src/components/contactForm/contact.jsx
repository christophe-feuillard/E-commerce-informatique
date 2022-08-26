import React, { useRef } from 'react';
import { MailIcon, PhoneIcon } from '@heroicons/react/outline'
import emailjs from '@emailjs/browser';


export default function ContactForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_eygg6c5', 'template_y0hjede', form.current, 'ieXtyrJ_3ODsSeqdr')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
      <div className="text-gray-900">
  
        <main className="overflow-hidden">
          <section className="relative " aria-labelledby="contact-heading">
            <div className="absolute w-full h-1/2 bg-warm-gray-50" aria-hidden="true" />
      
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6  sm:mt-40 lg:px-8 mt-0 ">
              <div className="relative  shadow-xl">
                <h2 id="contact-heading" className="sr-only">
                  Contactez-Nous
                </h2>
  
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  <div className="relative overflow-hidden py-10 px-6 bg-gray-800  sm:px-10 xl:p-12">

                    <h3 className="text-lg font-medium text-white">Contact</h3>
                    <p className="mt-6 text-base text-teal-50 max-w-3xl">
                    Notre service clients est ouvert du lundi au samedi de 09h00 à 18h.
Vous pouvez nous joindre par
                    </p>
                    <dl className="mt-8 space-y-6">
                      <dd className="flex text-base text-teal-50">
                        <PhoneIcon className="flex-shrink-0 w-6 h-6 text-teal-200" aria-hidden="true" />
                        <span className="ml-3">01 43 43 23 48</span>
                      </dd>
                      <dd className="flex text-base text-teal-50">
                        <MailIcon className="flex-shrink-0 w-6 h-6 text-teal-200" aria-hidden="true" />
                        <span className="ml-3">support@e-commerce.com</span>
                      </dd>
                    </dl>
                    <ul role="list" className="mt-8 flex space-x-12">
                      <li>
                        <a className="text-teal-200 hover:text-teal-100" href="#">
                          <span className="sr-only">Facebook</span>
                          <svg className="w-7 h-7" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                            <path
                              fillRule="evenodd"
                              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a className="text-teal-200 hover:text-teal-100" href="#">
                          <span className="sr-only">GitHub</span>
                          <svg className="w-7 h-7" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                            <path
                              fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a className="text-teal-200 hover:text-teal-100" href="#">
                          <span className="sr-only">Twitter</span>
                          <svg className="w-7 h-7" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
  
                  {/* Contact form */}
                  <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                    <h3 className="text-lg font-medium text-warm-gray-900">Envoyez-Nous un message</h3>
                    <form ref={form} onSubmit={sendEmail} className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                      <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-warm-gray-900">
                          Prénom
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="last-name" className="block text-sm font-medium text-warm-gray-900">
                          Nom
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="last-name"
                            id="last-name"
                            autoComplete="family-name"
                            className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-warm-gray-900">
                          Email
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <label htmlFor="phone" className="block text-sm font-medium text-warm-gray-900">
                            Numéro de téléphone
                          </label>
                          <span id="phone-optional" className="text-sm text-warm-gray-500">
                            Facultatif
                          </span>
                        </div>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            autoComplete="tel"
                            className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 rounded-md"
                            aria-describedby="phone-optional"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="subject" className="block text-sm font-medium text-warm-gray-900">
                          Object
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="subject"
                            id="subject"
                            className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <div className="flex justify-between">
                          <label htmlFor="message" className="block text-sm font-medium text-warm-gray-900">
                            Message
                          </label>
                          <span id="message-max" className="text-sm text-warm-gray-500">
                            Max. 500 caractère
                          </span>
                        </div>
                        <div className="mt-1">
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border border-warm-gray-300 rounded-md"
                            aria-describedby="message-max"
                            defaultValue={''}
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-2 sm:flex sm:justify-end">
                        <button
                          type="submit"
                          className="mt-2 w-full text-gray-100 inline-flex items-center justify-center px-6 py-3 bg-gray-800 border-gray-800 border-500 sm:w-auto"
                        >
                          Envoyez
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }