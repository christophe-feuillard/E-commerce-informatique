<?php

// namespace App\Controller;

// use EasyPost\Parcel;
// use EasyPost\Address;
// use EasyPost\EasyPost;
// use EasyPost\Shipment;


// EasyPost::setApiKey("EZTK43459e0123eb4be6b9f321fa4acb658fUdW0DWgDyARhidHOEGll5w");

// $fromAddress = Address::create(array(
//   'company' => 'EasyPost',
//   'street1' => '417 Montgomery Street',
//   'street2' => '5th Floor',
//   'city' => 'San Francisco',
//   'state' => 'CA',
//   'zip' => '94104',
//   'phone' => '415-528-7555'
// ));

// $toAddress = Address::create(array(
//   'name' => 'George Costanza',
//   'company' => 'Vandelay Industries',
//   'street1' => '1 E 161st St.',
//   'city' => 'Bronx',
//   'state' => 'NY',
//   'zip' => '10451'
// ));

// $parcel = Parcel::create(array(
//   "length" => 9,
//   "width" => 6,
//   "height" => 2,
//   "weight" => 10
// ));

// $shipment = Shipment::create(array(
//   "to_address" => $toAddress,
//   "from_address" => $fromAddress,
//   "parcel" => $parcel
// ));

// foreach ($shipment->rates as $rate) {
//   print_r($rate->carrier);
//   print_r($rate->service);
//   print_r($rate->rate);
//   print_r($rate->id);
// }