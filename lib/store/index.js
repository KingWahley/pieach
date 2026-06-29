import { initialCalendarSettings } from '@/data/calendarSettings';
import { createStore } from './createStore';
import { createSettingsStore } from './createSettingsStore';
import * as mockData from '@/data/mockData';
import { NEW_MOCK_APPOINTMENTS } from '@/data/appointments';

export const projectsStore = createStore(mockData.projectsData, 'p', 'projects');
export const projectCategoriesStore = createStore(mockData.projectCategories, 'pcat', 'project_categories');
export const teamStore = createStore(mockData.teamData, 't', 'team');
export const jobApplicationsStore = createStore([], 'app', 'job_applications');
export const messagesStore = createStore(mockData.messagesData, 'msg', 'messages');
export const vacanciesStore = createStore(mockData.vacanciesData, 'v', 'vacancies');
export const blogStore = createStore(mockData.blogData, 'b', 'blog');
export const blogCategoriesStore = createStore(mockData.blogCategoriesData, 'bc', 'blog_categories');
export const mediaStore = createStore(mockData.mediaData, 'm', 'media');
export const calendarStore = createStore(mockData.calendarData, 'c', 'calendar');
export const appointmentsStore = createStore(NEW_MOCK_APPOINTMENTS, 'apt', 'appointments');
export const calendarSettingsStore = createSettingsStore(initialCalendarSettings, 'calendar_settings');
