import { useState, useRef, useMemo, FC } from 'react'
import { Box, SxProps, Theme, Typography } from '@mui/material'
import GoogleMapReact from 'google-map-react'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import useSupercluster from 'use-supercluster'
import { BBox } from 'geojson'
import Supercluster from 'supercluster'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import dayjs from 'dayjs'

import { GOOGLE_MAP_API, mapCenter } from '../../helpers/constants'
import { Fullscreen } from '../../assets/icons/fullscreen'
import { MapMarker } from '../../assets/icons/map-marker'
import Api from '../../api'
import { IAuditLocationListItem } from '../../types/audit'
import { _getAuditOverviewState } from '../../store/_selectors'
import { _auditOverviewActions } from '../../store/slices/audit'
import { IDashboardLocationListItem, IDashboardOverviewFilters } from '../../types/dashboard'
import useDebounce from '../../hooks/useDebounce'
import DashboardMapMarkerLocationDetail from './DashboardMapMarkerLocationDetail'

const MarkerWrapper = ({
  children,
}: {
  lat: number
  lng: number
  children: React.ReactNode
  className?: string
  width?: number
  height?: number
}) => {
  return <>{children}</>
}

const defaultProps = {
  center: mapCenter,
  zoom: 11,
}

const MAX_ZOOM = 20

const iconStyle: SxProps<Theme> = {
  display: 'flex',
  mr: 1.5,
  mb: 2,
  borderRadius: '4px',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#FFFFFF',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  width: '28px',
  height: '28px',
  cursor: 'pointer',
}

interface IClusterProperty {
  cluster: boolean
  location: IAuditLocationListItem
}

interface IProps {
  filters: IDashboardOverviewFilters
}

const DashboardOverviewMap: FC<IProps> = ({ filters }) => {
  const refMap = useRef<any>(null)
  const refMaps = useRef<any>(null)
  const refMapRef = useRef<any>(null)
  const refFullscreen = useRef<any>(null)
  const refEmptyInfo = useRef<any>(null)
  const markerClusterer = useRef<MarkerClusterer | null>(null)

  const [isMapLoaded, setIsLoadedMap] = useState(false)
  const [bounds, setBounds] = useState<BBox | undefined>()
  const [zoom, setZoom] = useState(defaultProps.zoom)
  const [selectedLocation, setSelectedLocation] = useState<IDashboardLocationListItem | null>(null)

  const isFullscreen = document.fullscreenElement === refMapRef.current

  const handleZoomIn = () => {
    if (zoom < MAX_ZOOM) {
      setZoom(zoom + 1)
      refMap.current.setZoom(zoom + 1)
    }
  }

  const handleZoomOut = () => {
    if (zoom > 0) {
      setZoom(zoom - 1)
      refMap.current.setZoom(zoom - 1)
    }
  }

  const selectedProjectIds = useMemo(
    () => filters.projects.map((p) => p.value as number),
    [filters.projects]
  )

  const selectedLocationIds = useMemo(
    () => filters.locations.map((p) => p.value as number),
    [filters.locations]
  )

  const debouncedSearch = useDebounce(filters.search, 500)

  const { data: locationList } = Api.useGetAuditLocationListQuery({
    text: debouncedSearch,
    projectIds: selectedProjectIds as number[],
    locationIds: selectedLocationIds as number[],
    ...(filters.startDate
      ? { startDate: dayjs(filters.startDate).startOf('day').toISOString() }
      : {}),
    ...(filters.endDate ? { endDate: dayjs(filters.endDate).endOf('day').toISOString() } : {}),
  })

  const locations = locationList?.rows || []

  const points = useMemo<Array<Supercluster.PointFeature<IClusterProperty>>>(() => {
    return locations.map((loc) => {
      return {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [loc.lng, loc.lat] },
        properties: { cluster: false, location: loc },
      } as Supercluster.PointFeature<IClusterProperty>
    })
  }, [locations])

  const { clusters, supercluster: instSuperCluster } = useSupercluster<IClusterProperty>({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  })

  const handleLoaded = ({ map, maps, ref }: { map: any; maps: any; ref: Element | null }) => {
    refMap.current = map
    refMaps.current = maps
    refMapRef.current = ref

    // Add fullscreen button
    map.controls[maps.ControlPosition.RIGHT_BOTTOM].push(refFullscreen.current)

    // Add empty info
    map.controls[maps.ControlPosition.TOP_LEFT].push(refEmptyInfo.current)

    maps.event.addListener(map, 'tilesloaded', function () {
      // Is Loaded
      setIsLoadedMap(true)
      // clear the listener, we only need it once
      maps.event.clearListeners(map, 'tilesloaded')
    })

    // Initialize cluster
    markerClusterer.current = new MarkerClusterer({
      map: refMap.current,
      markers: [],
    })
  }

  const handleFullscreenMap = () => {
    if (refMap.current) {
      if (document.fullscreenElement === refMapRef.current) {
        document.exitFullscreen()
      } else {
        refMapRef.current.requestFullscreen()
      }
    }
  }

  const handleCloseMarker = () => {
    setSelectedLocation(null)
  }

  const handleChildClick = (hoverKey: any) => {
    const cluster = clusters[hoverKey]

    if (cluster) {
      const properties = cluster.properties
      if (properties.cluster === false) {
        const location = properties.location
        if (selectedLocation === null || selectedLocation.id !== location.id) {
          setSelectedLocation({ ...location })
        } else {
          setSelectedLocation(null)
        }
      } else {
        if (instSuperCluster && cluster && typeof cluster.id === 'number') {
          const expansionZoom = Math.min(
            instSuperCluster.getClusterExpansionZoom(cluster.id as number),
            MAX_ZOOM
          )
          const coordinates = cluster.geometry.coordinates
          refMap.current.setZoom(expansionZoom)
          refMap.current.panTo({ lat: coordinates[1], lng: coordinates[0] })
        }
      }
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.grey[400],
        borderRadius: isFullscreen ? 0 : 3,
        minHeight: { xs: '550px' },
        height: '550px',
        width: '100%',
        position: 'relative',
        '& > div > div': {
          borderRadius: isFullscreen ? '0px' : '12px',
        },
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAP_API }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={{
          fullscreenControl: false,
          zoomControl: false,
          panControl: true,
          clickableIcons: false,
        }}
        onGoogleApiLoaded={handleLoaded}
        onChildMouseDown={handleChildClick}
        yesIWantToUseGoogleMapApiInternals
        onChange={({ zoom, bounds }) => {
          setZoom(zoom)
          setBounds([bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat])
        }}
      >
        {clusters.map((cluster, idx) => {
          const [longitude, latitude] = cluster.geometry.coordinates
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties as Supercluster.ClusterProperties

          const location = cluster.properties.location

          const isCautioned = !isCluster && location?.avgPerformance < 70
          const isSelected = !isCluster && selectedLocation?.id === location?.id

          if (isCluster) {
            return (
              <MarkerWrapper key={idx} lat={latitude} lng={longitude}>
                <Box
                  sx={{
                    borderRadius: '50%',
                    background: (theme) => theme.palette.error.main,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    padding: 2,
                    width: 5.5,
                    height: 5.5,
                    cursor: 'pointer',
                  }}
                  onClick={() => {}}
                >
                  <Typography variant='h5' sx={{ lineHeight: 1, color: '#ffffff' }}>
                    {pointCount}
                  </Typography>
                </Box>
              </MarkerWrapper>
            )
          }

          return (
            <MarkerWrapper key={idx} lat={latitude} lng={longitude}>
              <Box
                sx={{
                  left: isCautioned ? -25 : -20,
                  top: isCautioned ? -30 : -25,
                  cursor: 'pointer',
                  position: 'absolute',
                }}
              >
                <MapMarker
                  sx={{
                    display: 'block',
                    color: (theme) =>
                      isCautioned ? theme.palette.error.main : theme.palette.success.main,
                    width: isCautioned ? '50px' : '40px',
                    height: 'auto',
                  }}
                />
                <DashboardMapMarkerLocationDetail
                  location={location}
                  open={isSelected}
                  onClose={() => handleCloseMarker()}
                />
              </Box>
            </MarkerWrapper>
          )
        })}
      </GoogleMapReact>
      <Box
        ref={refFullscreen}
        sx={{
          display: !isMapLoaded ? 'none' : 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={iconStyle} onClick={handleZoomIn}>
          <AddIcon sx={{ fontSize: 20, color: (theme) => theme.palette.grey[800] }} />
        </Box>
        <Box sx={iconStyle} onClick={handleZoomOut}>
          <RemoveIcon sx={{ fontSize: 20, color: (theme) => theme.palette.grey[800] }} />
        </Box>
        <Box sx={iconStyle} onClick={handleFullscreenMap}>
          <Fullscreen sx={{ fontSize: 20, color: (theme) => theme.palette.grey[800] }} />
        </Box>
      </Box>
    </Box>
  )
}

export default DashboardOverviewMap
