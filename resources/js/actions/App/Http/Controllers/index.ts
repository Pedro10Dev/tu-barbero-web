import BookingController from './BookingController'
import PhonePromptController from './PhonePromptController'
import ClientProfileController from './ClientProfileController'
import Auth from './Auth'
import Settings from './Settings'
const Controllers = {
    BookingController: Object.assign(BookingController, BookingController),
PhonePromptController: Object.assign(PhonePromptController, PhonePromptController),
ClientProfileController: Object.assign(ClientProfileController, ClientProfileController),
Auth: Object.assign(Auth, Auth),
Settings: Object.assign(Settings, Settings),
}

export default Controllers