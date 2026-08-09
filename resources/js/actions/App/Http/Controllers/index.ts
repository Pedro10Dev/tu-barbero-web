import BookingController from './BookingController'
import Settings from './Settings'
const Controllers = {
    BookingController: Object.assign(BookingController, BookingController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers