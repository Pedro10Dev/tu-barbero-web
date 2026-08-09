import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BookingController::index
 * @see app/Http/Controllers/BookingController.php:19
 * @route '/'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BookingController::index
 * @see app/Http/Controllers/BookingController.php:19
 * @route '/'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BookingController::index
 * @see app/Http/Controllers/BookingController.php:19
 * @route '/'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BookingController::index
 * @see app/Http/Controllers/BookingController.php:19
 * @route '/'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BookingController::availability
 * @see app/Http/Controllers/BookingController.php:28
 * @route '/api/booking/availability'
 */
export const availability = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availability.url(options),
    method: 'get',
})

availability.definition = {
    methods: ["get","head"],
    url: '/api/booking/availability',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BookingController::availability
 * @see app/Http/Controllers/BookingController.php:28
 * @route '/api/booking/availability'
 */
availability.url = (options?: RouteQueryOptions) => {
    return availability.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BookingController::availability
 * @see app/Http/Controllers/BookingController.php:28
 * @route '/api/booking/availability'
 */
availability.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availability.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BookingController::availability
 * @see app/Http/Controllers/BookingController.php:28
 * @route '/api/booking/availability'
 */
availability.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: availability.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BookingController::store
 * @see app/Http/Controllers/BookingController.php:46
 * @route '/booking'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/booking',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BookingController::store
 * @see app/Http/Controllers/BookingController.php:46
 * @route '/booking'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BookingController::store
 * @see app/Http/Controllers/BookingController.php:46
 * @route '/booking'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})
const BookingController = { index, availability, store }

export default BookingController