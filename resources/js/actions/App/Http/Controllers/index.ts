import BookingController from './BookingController'
import PhonePromptController from './PhonePromptController'
import BarberDashboardController from './BarberDashboardController'
import Agenda from './Agenda'
import Admin from './Admin'
import ClientProfileController from './ClientProfileController'
import Auth from './Auth'
import Settings from './Settings'

const Controllers = {
    BookingController: Object.assign(BookingController, BookingController),
    PhonePromptController: Object.assign(PhonePromptController, PhonePromptController),
    BarberDashboardController: Object.assign(BarberDashboardController, BarberDashboardController),
    Agenda: Object.assign(Agenda, Agenda),
    Admin: Object.assign(Admin, Admin),
    ClientProfileController: Object.assign(ClientProfileController, ClientProfileController),
    Auth: Object.assign(Auth, Auth),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers