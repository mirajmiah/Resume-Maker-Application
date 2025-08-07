        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('resume-form');
            const preview = document.getElementById('resume-preview');

            // --- DYNAMIC SECTION MANAGEMENT ---

            function addExperienceEntry(data = {}) {
                const container = document.getElementById('experience-entries');
                const entryDiv = document.createElement('div');
                entryDiv.className = 'p-3 border rounded-md relative';
                entryDiv.innerHTML = `
                    <input type="text" placeholder="Job Title" class="p-2 border rounded-md w-full mb-2" value="${data.title || ''}" data-type="experience-title">
                    <input type="text" placeholder="Company" class="p-2 border rounded-md w-full mb-2" value="${data.company || ''}" data-type="experience-company">
                    <div class="grid grid-cols-2 gap-2 mb-2">
                        <input type="text" placeholder="Start Date (e.g., Jan 2024)" class="p-2 border rounded-md w-full" value="${data.startDate || ''}" data-type="experience-startDate">
                        <input type="text" placeholder="End Date (e.g., Present)" class="p-2 border rounded-md w-full" value="${data.endDate || ''}" data-type="experience-endDate">
                    </div>
                    <textarea placeholder="(use bullet points for details)&#10;• Accomplishment 1&#10;• Accomplishment 2" class="p-2 border rounded-md w-full h-20" data-type="experience-description">${data.description || ''}</textarea>
                    <button type="button" class="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs remove-entry">-</button>
                `;
                container.appendChild(entryDiv);
            }
            
            function addInternshipEntry(data = {}) {
                const container = document.getElementById('internship-entries');
                const entryDiv = document.createElement('div');
                entryDiv.className = 'p-3 border rounded-md relative';
                entryDiv.innerHTML = `
                    <input type="text" placeholder="Internship Title" class="p-2 border rounded-md w-full mb-2" value="${data.title || ''}" data-type="internship-title">
                    <input type="text" placeholder="Company" class="p-2 border rounded-md w-full mb-2" value="${data.company || ''}" data-type="internship-company">
                    <div class="grid grid-cols-2 gap-2 mb-2">
                        <input type="text" placeholder="Start Date (e.g., Jun 2022)" class="p-2 border rounded-md w-full" value="${data.startDate || ''}" data-type="internship-startDate">
                        <input type="text" placeholder="End Date (e.g., Aug 2022)" class="p-2 border rounded-md w-full" value="${data.endDate || ''}" data-type="internship-endDate">
                    </div>
                    <textarea placeholder="(use bullet points for details)&#10;• Responsibility 1&#10;• Responsibility 2" class="p-2 border rounded-md w-full h-20" data-type="internship-description">${data.description || ''}</textarea>
                    <button type="button" class="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs remove-entry">-</button>
                `;
                container.appendChild(entryDiv);
            }

            function addEducationEntry(data = {}) {
                const container = document.getElementById('education-entries');
                const entryDiv = document.createElement('div');
                entryDiv.className = 'p-3 border rounded-md relative';
                entryDiv.innerHTML = `
                    <input type="text" placeholder="Degree / Certificate" class="p-2 border rounded-md w-full mb-2" value="${data.degree || ''}" data-type="education-degree">
                    <input type="text" placeholder="Institution" class="p-2 border rounded-md w-full mb-2" value="${data.institution || ''}" data-type="education-institution">
                    <div class="grid grid-cols-2 gap-2 mb-2">
                        <input type="text" placeholder="Start Date (e.g., Sep 2019)" class="p-2 border rounded-md w-full" value="${data.startDate || ''}" data-type="education-startDate">
                        <input type="text" placeholder="End Date (e.g., Sep 2023)" class="p-2 border rounded-md w-full" value="${data.endDate || ''}" data-type="education-endDate">
                    </div>
                    <textarea placeholder="Relevant Coursework / Details" class="p-2 border rounded-md w-full h-20" data-type="education-details">${data.details || ''}</textarea>
                    <button type="button" class="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs remove-entry">-</button>
                `;
                container.appendChild(entryDiv);
            }
            
            function addProjectEntry(data = {}) {
                const container = document.getElementById('project-entries');
                const entryDiv = document.createElement('div');
                entryDiv.className = 'p-3 border rounded-md relative';
                entryDiv.innerHTML = `
                    <input type="text" placeholder="Project Name" class="p-2 border rounded-md w-full mb-2" value="${data.name || ''}" data-type="project-name">
                    <input type="text" placeholder="Company / Organization" class="p-2 border rounded-md w-full mb-2" value="${data.company || ''}" data-type="project-company">
                    <textarea placeholder="(use bullet points for details)&#10;• Feature 1&#10;• Feature 2" class="p-2 border rounded-md w-full h-20" data-type="project-details">${data.details || ''}</textarea>
                    <button type="button" class="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs remove-entry">-</button>
                `;
                container.appendChild(entryDiv);
            }

            document.getElementById('add-experience').addEventListener('click', () => addExperienceEntry());
            document.getElementById('add-internship').addEventListener('click', () => addInternshipEntry());
            document.getElementById('add-education').addEventListener('click', () => addEducationEntry());
            document.getElementById('add-project').addEventListener('click', () => addProjectEntry());

            form.addEventListener('click', function(e) {
                if (e.target.classList.contains('remove-entry')) {
                    e.target.parentElement.remove();
                    updatePreview();
                }
            });

            // --- REAL-TIME PREVIEW UPDATE ---

            // Helper function to check if a string looks like a URL
            const isLikelyUrl = (str) => {
                try {
                    const url = new URL(str.startsWith('http') ? str : `http://${str}`);
                    return url.hostname.includes('.');
                } catch (e) {
                    return false;
                }
            };

            function updatePreview() {
                // Update simple text fields and textareas
                form.querySelectorAll('[data-preview]').forEach(input => {
                    const previewEl = document.getElementById(input.dataset.preview);
                    if (previewEl) {
                        const value = input.value;
                        
                        if (input.id === 'skills') {
                            previewEl.innerHTML = value.split(',')
                                .map(skill => skill.trim())
                                .filter(skill => skill)
                                .map(skill => `<span class="bg-gray-200 text-gray-800 text-sm font-medium mr-2 mb-2 px-2.5 py-0.5 rounded">${skill}</span>`)
                                .join('');
                        } else if (input.tagName === 'TEXTAREA') {
                             previewEl.innerText = value || input.placeholder;
                        } else {
                            previewEl.textContent = value || input.placeholder;
                        }
                    }
                });
                
                // Update single-line contact info
                const contactContainer = document.getElementById('preview-contact');
                contactContainer.innerHTML = ''; // Clear previous content
                const contactParts = [];
                
                const location = document.getElementById('location').value;
                const phone = document.getElementById('phone').value;
                const email = document.getElementById('email').value;
                const website = document.getElementById('website').value;
                const linkedin = document.getElementById('linkedin').value;
                const github = document.getElementById('github').value;

                if (location) contactParts.push(`<span>${location}</span>`);
                if (phone) contactParts.push(`<span>${phone}</span>`);
                if (email) contactParts.push(`<span>${email}</span>`);

                if (website) {
                    const content = isLikelyUrl(website) ? 
                        `<a href="http://${website.replace(/^https?:\/\//, '')}" target="_blank" class="flex items-center text-blue-600 hover:underline"><svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.72 7.97 5 10 5c2.03 0 3.488.72 4.256 1.321.77.602 1.425 1.555 1.912 2.706a6.012 6.012 0 010 3.946c-.487 1.151-1.142 2.104-1.912 2.706-.768.602-2.226 1.321-4.256 1.321-2.03 0-3.488-.72-4.256-1.321a6.01 6.01 0 01-1.912-2.706 6.012 6.012 0 010-3.946z" clip-rule="evenodd"></path><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>Website</a>` : 
                        `<span>${website}</span>`;
                    contactParts.push(content);
                }
                if (linkedin) {
                    const content = isLikelyUrl(linkedin) ? 
                        `<a href="http://${linkedin.replace(/^https?:\/\//, '')}" target="_blank" class="flex items-center text-blue-600 hover:underline"><svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>LinkedIn</a>` : 
                        `<span>${linkedin}</span>`;
                    contactParts.push(content);
                }
                if (github) {
                    const content = isLikelyUrl(github) ? 
                        `<a href="http://${github.replace(/^https?:\/\//, '')}" target="_blank" class="flex items-center text-blue-600 hover:underline"><svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>GitHub</a>` : 
                        `<span>${github}</span>`;
                    contactParts.push(content);
                }
                
                contactContainer.innerHTML = contactParts.join('<span class="mx-2">|</span>');


                // Generic function to update dynamic sections
                function updateDynamicSection(entriesId, previewId, fields, template) {
                    const previewContainer = document.getElementById(previewId);
                    previewContainer.innerHTML = '';
                    document.querySelectorAll(`#${entriesId} > div`).forEach(entry => {
                        const data = {};
                        let hasContent = false;
                        fields.forEach(field => {
                            const element = entry.querySelector(`[data-type="${field}"]`);
                            data[field] = element.value;
                            if (element.value) hasContent = true;
                        });

                        if (hasContent) {
                             previewContainer.innerHTML += template(data);
                        }
                    });
                }

                const experienceTemplate = (data) => `
                    <div class="mb-4">
                        <div class="flex justify-between items-baseline">
                            <h3 class="text-lg font-semibold">${data['experience-title']}</h3>
                            <p class="text-sm text-gray-600">${data['experience-startDate']} - ${data['experience-endDate']}</p>
                        </div>
                        <p class="text-md font-medium text-gray-700">${data['experience-company']}</p>
                        <ul class="list-disc list-inside text-gray-600 mt-1">
                            ${data['experience-description'].split('\n').map(line => `<li>${line.replace(/•/g, '').trim()}</li>`).join('')}
                        </ul>
                    </div>`;
                
                const internshipTemplate = (data) => `
                    <div class="mb-4">
                        <div class="flex justify-between items-baseline">
                            <h3 class="text-lg font-semibold">${data['internship-title']}</h3>
                            <p class="text-sm text-gray-600">${data['internship-startDate']} - ${data['internship-endDate']}</p>
                        </div>
                        <p class="text-md font-medium text-gray-700">${data['internship-company']}</p>
                        <ul class="list-disc list-inside text-gray-600 mt-1">
                            ${data['internship-description'].split('\n').map(line => `<li>${line.replace(/•/g, '').trim()}</li>`).join('')}
                        </ul>
                    </div>`;

                const educationTemplate = (data) => `
                    <div class="mb-4">
                        <div class="flex justify-between items-baseline">
                            <h3 class="text-lg font-semibold">${data['education-degree']}</h3>
                            <p class="text-sm text-gray-600">${data['education-startDate']} - ${data['education-endDate']}</p>
                        </div>
                        <p class="text-md font-medium text-gray-700">${data['education-institution']}</p>
                        <p class="text-gray-600 mt-1">${data['education-details']}</p>
                    </div>`;

                const projectTemplate = (data) => `
                    <div class="mb-4">
                        <h3 class="text-lg font-semibold">${data['project-name']}</h3>
                        <p class="text-md font-medium text-gray-700">${data['project-company']}</p>
                        <ul class="list-disc list-inside text-gray-600 mt-1">
                            ${data['project-details'].split('\n').map(line => `<li>${line.replace(/•/g, '').trim()}</li>`).join('')}
                        </ul>
                    </div>`;

                updateDynamicSection('experience-entries', 'preview-experience', ['experience-title', 'experience-company', 'experience-startDate', 'experience-endDate', 'experience-description'], experienceTemplate);
                updateDynamicSection('internship-entries', 'preview-internship', ['internship-title', 'internship-company', 'internship-startDate', 'internship-endDate', 'internship-description'], internshipTemplate);
                updateDynamicSection('education-entries', 'preview-education', ['education-degree', 'education-institution', 'education-startDate', 'education-endDate', 'education-details'], educationTemplate);
                updateDynamicSection('project-entries', 'preview-projects', ['project-name', 'project-company', 'project-details'], projectTemplate);
            }

            form.addEventListener('input', updatePreview);

            // --- DOWNLOAD FUNCTIONALITY ---

            document.getElementById('download-pdf').addEventListener('click', () => {
                const resumeElement = document.getElementById('resume-preview-container');
                const opt = {
                    margin:       0.5,
                    filename:     'resume.pdf',
                    image:        { type: 'jpeg', quality: 0.98 },
                    html2canvas:  { scale: 2, useCORS: true },
                    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
                };
                html2pdf().from(resumeElement).set(opt).save();
            });

            document.getElementById('download-txt').addEventListener('click', () => {
                let txtContent = '';
                
                function getContent(elementId) {
                    const el = document.getElementById(elementId);
                    return el.value || el.placeholder;
                }

                txtContent += `${getContent('name')}\n${getContent('title')}\n\n`;
                
                txtContent += `CONTACT\n-------\n`;
                if(document.getElementById('location').value) txtContent += `Location: ${document.getElementById('location').value}\n`;
                if(document.getElementById('email').value) txtContent += `Email: ${document.getElementById('email').value}\n`;
                if(document.getElementById('phone').value) txtContent += `Phone: ${document.getElementById('phone').value}\n`;
                if(document.getElementById('website').value) txtContent += `Website: ${document.getElementById('website').value}\n`;
                if(document.getElementById('linkedin').value) txtContent += `LinkedIn: ${document.getElementById('linkedin').value}\n`;
                if(document.getElementById('github').value) txtContent += `GitHub: ${document.getElementById('github').value}\n\n`;

                const summaryContent = document.getElementById('summary').value;
                if(summaryContent) txtContent += `SUMMARY\n-------\n${summaryContent}\n\n`;

                const skillsContent = document.getElementById('skills').value;
                if(skillsContent) txtContent += `SKILLS\n------\n${skillsContent}\n\n`;

                txtContent += `PROFESSIONAL EXPERIENCE\n-----------------------\n`;
                document.querySelectorAll('#experience-entries > div').forEach(entry => {
                     txtContent += `${entry.querySelector('[data-type="experience-title"]').value}\n`;
                     txtContent += `${entry.querySelector('[data-type="experience-company"]').value}\n`;
                     txtContent += `${entry.querySelector('[data-type="experience-startDate"]').value} - ${entry.querySelector('[data-type="experience-endDate"]').value}\n`;
                     txtContent += `${entry.querySelector('[data-type="experience-description"]').value}\n\n`;
                });
                
                txtContent += `INTERNSHIPS\n-----------\n`;
                document.querySelectorAll('#internship-entries > div').forEach(entry => {
                     txtContent += `${entry.querySelector('[data-type="internship-title"]').value}\n`;
                     txtContent += `${entry.querySelector('[data-type="internship-company"]').value}\n`;
                     txtContent += `${entry.querySelector('[data-type="internship-startDate"]').value} - ${entry.querySelector('[data-type="internship-endDate"]').value}\n`;
                     txtContent += `${entry.querySelector('[data-type="internship-description"]').value}\n\n`;
                });

                txtContent += `EDUCATION\n---------\n`;
                document.querySelectorAll('#education-entries > div').forEach(entry => {
                    txtContent += `${entry.querySelector('[data-type="education-degree"]').value}\n`;
                    txtContent += `${entry.querySelector('[data-type="education-institution"]').value}\n`;
                    txtContent += `${entry.querySelector('[data-type="education-startDate"]').value} - ${entry.querySelector('[data-type="education-endDate"]').value}\n`;
                    txtContent += `${entry.querySelector('[data-type="education-details"]').value}\n\n`;
                });
                
                txtContent += `PROJECTS\n--------\n`;
                document.querySelectorAll('#project-entries > div').forEach(entry => {
                    txtContent += `${entry.querySelector('[data-type="project-name"]').value}\n`;
                    txtContent += `${entry.querySelector('[data-type="project-company"]').value}\n`;
                    txtContent += `${entry.querySelector('[data-type="project-details"]').value}\n\n`;
                });

                const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
                saveAs(blob, 'resume.txt');
            });

            // --- FORM RESET ---
            document.getElementById('reset-form').addEventListener('click', () => {
                if (confirm('Are you sure you want to clear all fields?')) {
                    form.reset();
                    document.getElementById('experience-entries').innerHTML = '';
                    document.getElementById('internship-entries').innerHTML = '';
                    document.getElementById('education-entries').innerHTML = '';
                    document.getElementById('project-entries').innerHTML = '';
                    initializeApp();
                }
            });

            // --- INITIALIZATION ---
            function initializeApp() {
                 // Clear existing entries before loading new ones
                document.getElementById('experience-entries').innerHTML = '';
                document.getElementById('internship-entries').innerHTML = '';
                document.getElementById('education-entries').innerHTML = '';
                document.getElementById('project-entries').innerHTML = '';
                
                // Set default placeholders for preview
                document.getElementById('preview-name').textContent = 'YOUR NAME';
                document.getElementById('preview-title').textContent = 'PROFESSIONAL TITLE';
                
                // Add one blank entry for dynamic sections
                addExperienceEntry();
                addInternshipEntry();
                addEducationEntry();
                addProjectEntry();

                // Initial render
                updatePreview();
            }

            initializeApp();
        });