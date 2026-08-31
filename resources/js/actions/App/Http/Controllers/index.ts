import BookingController from './BookingController'
import ClientProfileController from './ClientProfileController'
import Auth from './Auth'
import Settings from './Settings'
const Controllers = {
    BookingController: Object.assign(BookingController, BookingController),
ClientProfileController: Object.assign(ClientProfileController, ClientProfileController),
Auth: Object.assign(Auth, Auth),
Settings: Object.assign(Settings, Settings),
}

export default Controllers