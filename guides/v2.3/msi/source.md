---
group: msi
version: 2.3
title: Source Endpoints and APIs
github_link: msi/source.md

---

## Source Endpoints

    Source
      <route url="/V1/inventory/source" method="GET">
      <route url="/V1/inventory/source/:sourceCode" method="GET">
      <route url="/V1/inventory/source" method="POST">
      <route url="/V1/inventory/source/:sourceCode" method="PUT">
      <route url="/V1/inventory/get-sources-assigned-to-stock-ordered-by-priority/:stockId" method="GET">

## Source APIs
### Source data interface

\Magento\InventoryApi\Api\Data\SourceInterface

    namespace Magento\InventoryApi\Api\Data;

    /**
     * @api
     */
    interface SourceInterface extends \Magento\Framework\Api\ExtensibleDataInterface
    {
        /**#@+
         * Constants for keys of data array. Identical to the name of the getter in snake case
         */
        const SOURCE_ID = 'source_id';
        const NAME = 'name';
        const CONTACT_NAME = 'contact_name';
        const EMAIL = 'email';
        const IS_ACTIVE = 'is_active';
        const DESCRIPTION = 'description';
        const LATITUDE = 'latitude';
        const LONGITUDE = 'longitude';
        const COUNTRY_ID = 'country_id';
        const REGION_ID = 'region_id';
        const REGION = 'region';
        const CITY = 'city';
        const STREET = 'street';
        const POSTCODE = 'postcode';
        const PHONE = 'phone';
        const FAX = 'fax';
        const PRIORITY = 'priority';
        const CARRIER_LINKS = 'carrier_links';
        /**#@-*/

        /**
         * Get source id.
         *
         * @return int|null
         */
        public function getSourceId();

        /**
         * Set source id.
         *
         * @param int $sourceId
         * @return $this
         */
        public function setSourceId($sourceId);

        /**
         * Get source name.
         *
         * @return string
         */
        public function getName();

        /**
         * Set source name.
         *
         * @param string $name
         * @return $this
         */
        public function setName($name);

        /**
         * Get source email
         *
         * @return string
         */
        public function getEmail();

        /**
         * Set source email
         *
         * @param string $email
         * @return $this
         */
        public function setEmail($email);

        /**
         * Get source contact name.
         *
         * @return string
         */
        public function getContactName();

        /**
         * Set source contact name.
         *
         * @param string $contactName
         * @return $this
         */
        public function setContactName($contactName);

        /**
         * Check if source is enabled.
         *
         * @return bool
         */
        public function getIsActive();

        /**
         * Enable or disable source.
         *
         * @param bool $active
         * @return $this
         */
        public function setIsActive($active);

        /**
         * Get source description.
         *
         * @return string
         */
        public function getDescription();

        /**
         * Set source description.
         *
         * @param string $description
         * @return $this
         */
        public function setDescription($description);

        /**
         * Get source latitude.
         *
         * @return float
         */
        public function getLatitude();

        /**
         * Set source latitude.
         *
         * @param float $latitude
         * @return $this
         */
        public function setLatitude($latitude);

        /**
         * Get source longitude.
         *
         * @return int
         */
        public function getLongitude();

        /**
         * Set source longitude.
         *
         * @param int $longitude
         * @return $this
         */
        public function setLongitude($longitude);

        /**
         * Get source country id.
         *
         * @return string
         */
        public function getCountryId();

        /**
         * Set source country id.
         *
         * @param string $countryId
         * @return $this
         */
        public function setCountryId($countryId);

        /**
         * Get region id if source has registered region.
         *
         * @return int
         */
        public function getRegionId();

        /**
         * Set region id if source has registered region.
         *
         * @param int $regionId
         * @return $this
         */
        public function setRegionId($regionId);

        /**
         * Get region title if source has custom region
         *
         * @return string
         */
        public function getRegion();

        /**
         * Set source region title.
         *
         * @param string $region
         * @return $this
         */
        public function setRegion($region);

        /**
         * Get source city.
         *
         * @return string
         */
        public function getCity();

        /**
         * Set source city.
         *
         * @param string $city
         * @return $this
         */
        public function setCity($city);

        /**
         * Get source street name.
         *
         * @return string
         */
        public function getStreet();

        /**
         * Set source street name.
         *
         * @param string $street
         * @return $this
         */
        public function setStreet($street);

        /**
         * Get source post code.
         *
         * @return string
         */
        public function getPostcode();

        /**
         * Set source post code.
         *
         * @param string $postcode
         * @return $this
         */
        public function setPostcode($postcode);

        /**
         * Get source phone number.
         *
         * @return string
         */
        public function getPhone();

        /**
         * Set source phone number.
         *
         * @param string $phone
         * @return $this
         */
        public function setPhone($phone);

        /**
         * Get source fax.
         *
         * @return string
         */
        public function getFax();

        /**
         * Set source fax.
         *
         * @param string $fax
         * @return $this
         */
        public function setFax($fax);

        /**
         * Get source priority
         *
         * @return int
         */
        public function getPriority();

        /**
         * Set source priority
         *
         * @param int $priority
         * @return $this
         */
        public function setPriority($priority);

        /**
         * @param \Magento\InventoryApi\Api\Data\SourceCarrierLinkInterface[] $carrierLinks
         * @return $this
         */
        public function setCarrierLinks($carrierLinks);

        /**
         * @return \Magento\InventoryApi\Api\Data\SourceCarrierLinkInterface[]
         */
        public function getCarrierLinks();

        /**
         * Retrieve existing extension attributes object or create a new one.
         *
         * @return \Magento\InventoryApi\Api\Data\SourceExtensionInterface|null
         */
        public function getExtensionAttributes();

        /**
         * Set an extension attributes object.
         *
         * @param \Magento\InventoryApi\Api\Data\SourceExtensionInterface $extensionAttributes
         * @return $this
         */
        public function setExtensionAttributes(
            \Magento\InventoryApi\Api\Data\SourceExtensionInterface $extensionAttributes
        );
    }

### Source Repository Interface

\Magento\InventoryApi\Api\SourceRepositoryInterface

    namespace Magento\InventoryApi\Api;

    /**
     * @api
     */
    interface SourceRepositoryInterface
    {
        /**
         * Save Source data.
         *
         * @param \Magento\InventoryApi\Api\Data\SourceInterface $source
         * @return \Magento\InventoryApi\Api\Data\SourceInterface
         *
         * @throws \Magento\Framework\Exception\CouldNotSaveException
         */
        public function save(\Magento\InventoryApi\Api\Data\SourceInterface $source);

        /**
         * Load Source data by given sourceId.
         *
         * @param int $sourceId
         * @return \Magento\InventoryApi\Api\Data\SourceInterface
         */
        public function get($sourceId);

        /**
         * Load Source data collection by given search criteria
         *
         * @param \Magento\Framework\Api\SearchCriteriaInterface
         * @return \Magento\InventoryApi\Api\Data\SourceSearchResultsInterface
         */
        public function getList(\Magento\Framework\Api\SearchCriteriaInterface $searchCriteria = null);
    }

### Source Carrier Link Data Interface

\Magento\InventoryApi\Api\SourceCarrierLinkInterface

    namespace Magento\InventoryApi\Api\Data;

    /**
     * SourceCarrierLink interface
     * @api
     */
    interface SourceCarrierLinkInterface extends \Magento\Framework\Api\ExtensibleDataInterface
    {
        /**#@+
         * Constants for keys of data array. Identical to the name of the getter in snake case
         */
        const CARRIER_CODE = 'carrier_code';
        const POSITION = 'position';
        /**#@-*/


        /**
         * Get carrier code.
         *
         * @return string
         */
        public function getCarrierCode();

        /**
         * Set carrier code.
         *
         * @param string $carrierCode
         * @return $this
         */
        public function setCarrierCode($carrierCode);

        /**
         * Get position.
         *
         * @return int|null
         */
        public function getPosition();

        /**
         * Set position.
         *
         * @param int|null $position
         * @return $this
         */
        public function setPosition($position);

        /**
         * Retrieve existing extension attributes object or create a new one.
         *
         * @return \Magento\InventoryApi\Api\Data\SourceCarrierLinkExtensionInterface|null
         */
        public function getExtensionAttributes();

        /**
         * Set an extension attributes object.
         *
         * @param \Magento\InventoryApi\Api\Data\SourceCarrierLinkExtensionInterface $extensionAttributes
         * @return $this
         */
        public function setExtensionAttributes(
            \Magento\InventoryApi\Api\Data\SourceCarrierLinkExtensionInterface $extensionAttributes
        );
    }
