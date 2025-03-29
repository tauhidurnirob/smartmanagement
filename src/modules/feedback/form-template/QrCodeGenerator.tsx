import { FC, Fragment, useState } from "react"
import DialogWrapper from "../../common/DialogWrapper"
import { Box, Button, DialogContent, Divider, Grid, Stack, Typography } from "@mui/material"
import BuildingSelect from "../../location/BuildingSelect"
import { ISelectItem } from "../../../types/common"
import LevelSelect from "../../location/LevelSelect"
import AreaSelect from "../../location/AreaSelect"
import UnitSelect from "../../location/UnitSelect"
import ProjectSelect from "../../audit/project-sites/ProjectSelect"
import LocationSelect from "../../location/LocationSelect"
import QRCode from "qrcode.react";
import { grey } from "@mui/material/colors"
import { LoadingButton } from "@mui/lab"
import { DownloadLight } from "../../../assets/icons/download-light"

interface IQrCodeGeneratorFilter {
  projects: ISelectItem[]
  locations: ISelectItem[]
  buildings: ISelectItem[]
  levels: ISelectItem[]
  areas: ISelectItem[]
  units: ISelectItem[]
}

interface IProps {
  open: boolean
  onClose: () => void
}

const QrCodeGenerator:FC<IProps> = ({
  open,
  onClose
}) => {
  const [filters, setFilters] = useState<IQrCodeGeneratorFilter>({
    projects: [],
    locations: [],
    buildings: [],
    levels: [],
    areas: [],
    units: []
  })
  const [qrCodeValue, setQrCodeValue] = useState('')

  const handleChangeProjects = (projects: ISelectItem[]) => {
    setFilters({ ...filters, projects })
  }
  const handleChangeLocations = (locations: ISelectItem[]) => {
    setFilters({ ...filters, locations })
  }

  const handleChangeBuildings = (buildings: ISelectItem[]) => {
    setFilters({ ...filters, buildings })
  }

  const handleChangeLevels = (levels: ISelectItem[]) => {
    setFilters({ ...filters, levels })
  }

  const handleChangeAreas = (areas: ISelectItem[]) => {
    setFilters({ ...filters, areas })
  }

  const handleChangeUnits = (units: ISelectItem[]) => {
    setFilters({ ...filters, units })
  }

  const handleQrCodeGenerate = () => {
    const url = `public-feedback-form?projectId=${filters?.projects?.[0]?.value}&locationId=${filters?.locations?.[0]?.value}&
    buildingId=${filters?.buildings?.[0]?.value}&
    levelId=${filters?.levels?.[0]?.value}&
    areaId=${filters?.areas?.[0]?.value}&
    unitId=${filters?.units?.[0]?.value}`
    setQrCodeValue(url)
  }

  const downloadQR = () => {
    const canvas: any = document.getElementById("qr_code_wrapper");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <DialogWrapper
      open={open}
      onClose={onClose}
      label='Generate QR Code'
      maxWidth={'md'}
    >
      <DialogContent sx={{p: 4}}>
        <Grid container spacing={2} >
        <Grid item xs={12} sm={6} >
            <Typography typography='h5' sx={{ fontSize: 18, mb: 1.5 }}>
              Project
            </Typography>
            <ProjectSelect
              hiddenLabel={true}
              selected={filters.projects}
              onChange={handleChangeProjects}
              isSingleSelect
              disableAllSelect
            />
          </Grid>
          <Grid item xs={12} sm={6} >
            <Typography typography='h5' sx={{ fontSize: 18, mb: 1.5 }}>
              Location
            </Typography>
            <LocationSelect
              hiddenLabel={true}
              selected={filters.locations}
              onChange={handleChangeLocations}
              isSingleSelect
              disableAllSelect
            />
          </Grid>
          <Grid item xs={12} sm={6} >
            <Typography typography='h5' sx={{ fontSize: 18, mb: 1.5 }}>
              Building
            </Typography>
            <BuildingSelect
              hiddenLabel={true}
              selected={filters.buildings}
              onChange={handleChangeBuildings}
              isSingleSelect
              disableAllSelect
            />
          </Grid>
          <Grid item xs={12} sm={6} >
          <Typography typography='h5' sx={{ fontSize: 18, mb: 1.5 }}>
              Level
            </Typography>
            <LevelSelect
              hiddenLabel={true}
              selected={filters.levels}
              onChange={handleChangeLevels}
              isSingleSelect
              disableAllSelect
            />
          </Grid>
          <Grid item xs={12} sm={6} >
          <Typography typography='h5' sx={{ fontSize: 18, mb: 1.5 }}>
              Area
            </Typography>
            <AreaSelect
              hiddenLabel={true}
              selected={filters.areas}
              onChange={handleChangeAreas}
              isSingleSelect
              disableAllSelect
            />
          </Grid>
          <Grid item xs={12} sm={6} >
            <Typography typography='h5' sx={{ fontSize: 18, mb: 1.5 }}>
              Unit
            </Typography>
            <UnitSelect
              hiddenLabel={true}
              selected={filters.units}
              onChange={handleChangeUnits}
              isSingleSelect
              disableAllSelect
            />
          </Grid>
        </Grid>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} mt={3} flexWrap={'wrap'} >
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={!filters.projects.length || !filters.locations.length}
            onClick={handleQrCodeGenerate}
          >
            Generate QR Code
          </Button>
        </Stack>
        {
          qrCodeValue &&
          <>
            <Divider sx={{my: 4}} />
              <Stack direction={{xs: 'column', sm: 'row'}} gap={4} mb={3} >
                <QRCode
                  id="qr_code_wrapper"
                  value={qrCodeValue}
                  size={300}
                  level={"H"}
                />
                <Box>
                  <Grid container spacing={2}>
                    {
                      Object.keys(filters)?.map((f, idx) => {
                        return (
                          <Fragment key={idx}>
                            <Grid item xs={4} >
                              <Typography fontSize={18} fontWeight={700} textTransform={'capitalize'} >{f.slice(0, -1)}</Typography>
                            </Grid>
                            <Grid item xs={8} >
                              <Typography fontSize={18} color={'grey.600'} >
                                {(filters as any)[f]?.[0]?.label || '_'}
                              </Typography>
                            </Grid>
                          </Fragment>
                        )
                      })
                    }
                  </Grid>
                  <LoadingButton
                    variant='contained'
                    loading={false}
                    startIcon={<DownloadLight sx={{ fontSize: 15 }} />}
                    onClick={downloadQR}
                    sx={{mt: 3}}
                  >
                    Download all Audit Form
                  </LoadingButton>
                </Box>
              </Stack>
          </>
        }
      </DialogContent>
    </DialogWrapper>
  )
}

export default QrCodeGenerator