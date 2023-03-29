import {
  FaFacebook,
  FaGithub,
  FaHackerrank,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'

import { Icon } from 'stories/components'

const ServerDown = () => {
  return (
    <div className="text-white leading-8 text-xl">
      <h1>Server is down 🚨</h1>
      <p>This app will not be available anymore.</p>
      <p>Due this was a non-prod application it had a limited time on.</p>
      <p>
        So I decided to stop{' '}
        <a
          href="https://aws.com"
          target="_blank"
          className="text-amber-500"
          rel="noreferrer"
        >
          AWS
        </a>{' '}
        instances for this application.
      </p>
      <p>But the code is still available on Github:</p>
      <div className="flex mt-11">
        <a
          href="https://github.com/alexcloudstar/ac_chatapp_fe"
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            icon={<FaGithub className="text-[30px] ml-8" />}
            text="Frontend Repo"
            textClasses="whitespace-nowrap	ml-3"
          />
        </a>
        <a
          href="https://github.com/alexcloudstar/ac_chatapp_be"
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            icon={<FaGithub className="text-[30px] ml-8" />}
            text="Backend Repo"
            textClasses="whitespace-nowrap	ml-3"
          />
        </a>
      </div>
      <p className="mt-8">
        Feel free to reach at{' '}
        <a href="mailto:alexcloudstar@gmail.com" className="text-[#00a3ff]">
          alexcloudstar@gmail.com
        </a>{' '}
        for any queries or any sugestions 👋🏻
      </p>
      <div className="flex">
        <a
          href="https://www.facebook.com/alexcloudstar"
          target="_blank"
          rel="noreferrer"
        >
          <Icon icon={<FaFacebook className="text-[30px] mt-8 mr-3" />} />
        </a>
        <a
          href="https://www.twitter.com/alexcloudstar"
          target="_blank"
          rel="noreferrer"
        >
          <Icon icon={<FaTwitter className="text-[30px] mt-8 mr-3" />} />
        </a>
        <a
          href="https://www.linkedin.com/in/alexcloudstar"
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            icon={<FaLinkedin className="text-[30px] mt-8 mr-3" />}
            textClasses="whitespace-nowrap	ml-3"
          />
        </a>
        <a
          href="https://www.instagram.com/alexcloudstar/"
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            icon={<FaInstagram className="text-[30px] mt-8 mr-3" />}
            textClasses="whitespace-nowrap	ml-3"
          />
        </a>
        <a
          href="https://www.youtube.com/channel/UCueb-hU0uhdqpTfo1w1ZZ_Q"
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            icon={<FaYoutube className="text-[30px] mt-8 mr-3" />}
            textClasses="whitespace-nowrap	ml-3"
          />
        </a>
        <a
          href="https://github.com/alexcloudstar"
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            icon={<FaGithub className="text-[30px] mt-8 mr-3" />}
            textClasses="whitespace-nowrap	ml-3"
          />
        </a>
        <a
          href="https://www.hackerrank.com/alexcloudstar"
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            icon={<FaHackerrank className="text-[30px] mt-8 mr-3" />}
            textClasses="whitespace-nowrap	ml-3"
          />
        </a>
      </div>
    </div>
  )
}

export default ServerDown
