import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Auth } from './components/Auth/Auth';
import Cards from './pages/Cards/Cards';
import Choose from './pages/Choose/Choose';
import { SnackbarProvider } from 'notistack';
import Puzzles from './pages/Puzzle/Puzzle';
import Translate from './pages/Translate/Translate';
import Dictionary from './pages/Dictionary/Dictionary';
import { Layout } from './pages/Layout/Layout';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import ReactGA from 'react-ga4';
import { getUser, getUserStatus } from './redux/slice/user';
import { Recover } from './pages/Recover/Recover';
import { Activate } from './pages/Activate/Activate';
import { Profile } from './pages/Profile/Profile';
import { AdminPage } from './pages/AdminPage/AdminPage';
import { fetchUser } from './redux/thunk/userThunk';

function App() {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const location = useLocation();

  const userData = useAppSelector(getUser);
  const userStatus = useAppSelector(getUserStatus);

  const [waiting, setWaiting] = React.useState(true);

  const isReady = userStatus !== 'initial' && userStatus !== 'loading';

  const systemPages =
    location.pathname === '/recover' ||
    location.pathname === '/activate' ||
    location.pathname === '/adminpage';

  React.useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: `${location.pathname}` });
  }, [location]);

  React.useEffect(() => {
    if (systemPages) {
      setWaiting(false);
      return;
    }
    setWaiting(true);
    const fun = async () => {
      await dispatch(fetchUser());

      setWaiting(false);
    };

    fun();
  }, [dispatch]);

  React.useEffect(() => {
    if (systemPages) {
      return;
    }
    if (!userData && !isReady) {
      navigation('/auth');
    } else if (userData) {
      navigation('/dictionary');
    }
  }, [userData, isReady]);

  if (waiting) {
    return (
      <div className='container'>
        <span className='loader'></span>
        <span>Loading</span>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path='/auth' element={<Auth />} />

        {userData && (
          <Route element={<Layout />}>
            <Route
              path='/dictionary'
              element={
                <SnackbarProvider
                  maxSnack={3}
                  classes={{ containerRoot: 'snackBarRoot' }}
                >
                  <Dictionary />
                </SnackbarProvider>
              }
            />

            <Route path='/profile' element={<Profile />} />
            <Route path='/cards' element={<Cards />} />
            <Route path='/puzzles' element={<Puzzles />} />
            <Route path='/translate' element={<Translate />} />
            <Route path='/choose' element={<Choose />} />
          </Route>
        )}

        <Route path='/recover' element={<Recover />} />
        <Route path='/activate' element={<Activate />} />
        <Route path='/adminpage' element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;
