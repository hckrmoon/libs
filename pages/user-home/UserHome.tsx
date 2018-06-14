import React from 'react'
import Head from "next/head";
import axios from 'axios'
import {Layout} from "../../src/components/layout/Layout";
import {PageInit} from "../../src/components/initializer";

interface UserHomeProps {
  username: string
}

interface UserHomeState {
  fileSpread: boolean
  username: string
}

/**
 * define JoinPage class inherits React.Component
 * @React View Component
 */
export const UserHome = PageInit(class extends React.Component<UserHomeProps, UserHomeState> {

  /**
   * JoinPage class constructor method
   * @constructs
   * @param {UserHomeProps} props
   */
  constructor(props: UserHomeProps) {
    super(props)

    this.state = {
      fileSpread: false,
      username: props.username || '',
    }
  }

  async componentDidMount() {
    const response = await axios.get(`/api/entries/list?level=1&username=${this.state.username}`)
    console.log('response : ', response)
  }

  onToggle(e) {
    e.preventDefault()
    this.setState({
      fileSpread: !this.state.fileSpread,
    })
  }

  /**
   * JoinPage React Component render method
   * @returns {JSX.Element}
   */
  render() {
    const {fileSpread, username} = this.state

    return (
      <Layout>
        <Head>
        </Head>
        <main className="Home">
          <header className="Header">
            <h1>
              <i>Index of&nbsp;</i>
              <a href="/">{username}/</a>
            </h1>
            <a
              className={fileSpread ? '' : 'single-column'}
              id="toggle"
              title="click to toggle the view"
              onClick={e => this.onToggle(e)}
            />
          </header>
          <div className="Files">
            <ul id="files" className={fileSpread ? 'single-column' : ''}>
              <li>
                <a href="/dir" title="dir/" className="dir">
                  dir/
                </a>
              </li>
              <li>
                <a href="/dir2" title="dir2/" className="dir">
                  dir2/
                </a>
              </li>
              <li>
                <a href="/dir3" title="dir3/" className="dir">
                  dir3/
                </a>
              </li>
              <li>
                <a href="/file" title="file" className="png">
                  file
                </a>
              </li>
              <li>
                <a href="/file2" title="dir3/" className="file">
                  file2
                </a>
              </li>
              <li>
                <a href="/file3" title="file3/" className="file">
                  file3
                </a>
              </li>
            </ul>
          </div>
          <div className="Preview">

          </div>
        </main>
        <style jsx>{`
        .Files {
          max-width: 690px;
        }
      `}</style>
      </Layout>
    )
  }
})
