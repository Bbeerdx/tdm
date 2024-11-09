// Sample data for resources and shelters
export const resources = [
    {
        id: '1',
        name: 'Agartala Medical Center',
        type: 'Medical',
        lat: 23.8315,
        lng: 91.2868,
        available: 50,
        capacity: 100
    },
    {
        id: '2',
        name: 'West Tripura Shelter',
        type: 'Shelter',
        lat: 23.8407,
        lng: 91.2933,
        available: 200,
        capacity: 500
    },
    {
        id: '3',
        name: 'Food Distribution Center',
        type: 'Food',
        lat: 23.8367,
        lng: 91.2795,
        available: 1000,
        capacity: 1000
    }
];

// Resource management functions
export function updateResourceAvailability(id, count) {
    const resource = resources.find(r => r.id === id);
    if (resource && resource.available >= count) {
        resource.available -= count;
        return true;
    }
    return false;
}