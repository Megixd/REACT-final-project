import React from 'react'
import {Route, Routes} from "react-router-dom"
import appRoutes from './config/appRoutes'

const AppRoutes = () => {
  return (
    <Routes> 
      {
        appRoutes.map((route) => {
          if (route.guard) {
            return (
               <Route 
                key={route.path} 
                path={route.path} 
                element={
                  <route.guard>
                    <route.component />
                  </route.guard>
                }
              />
            )
          }
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component/>}
            />
          )
          })}
        </Routes>
        )
      }


export default AppRoutes;