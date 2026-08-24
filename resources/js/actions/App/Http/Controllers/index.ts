import BookingController from './BookingController'
import ClientProfileController from './ClientProfileController'
import Settings from './Settings'
const Controllers = {
    BookingController: Object.assign(BookingController, BookingController),
ClientProfileController: Object.assign(ClientProfileController, ClientProfileController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers